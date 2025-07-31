import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar operaciones asíncronas
 * @param {Function} asyncFunction - Función asíncrona a ejecutar
 * @param {boolean} immediate - Si debe ejecutarse inmediatamente
 * @returns {Object} Estado de la operación asíncrona
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...args);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle'
  };
};

/**
 * Hook para manejar múltiples operaciones asíncronas
 * @param {Object} asyncFunctions - Objeto con funciones asíncronas
 * @returns {Object} Estado de todas las operaciones
 */
export const useAsyncMultiple = (asyncFunctions) => {
  const [states, setStates] = useState(() => {
    const initialState = {};
    Object.keys(asyncFunctions).forEach(key => {
      initialState[key] = {
        status: 'idle',
        data: null,
        error: null
      };
    });
    return initialState;
  });

  const execute = useCallback(async (key, ...args) => {
    if (!asyncFunctions[key]) {
      throw new Error(`Function ${key} not found`);
    }

    setStates(prev => ({
      ...prev,
      [key]: { ...prev[key], status: 'pending', error: null }
    }));

    try {
      const response = await asyncFunctions[key](...args);
      setStates(prev => ({
        ...prev,
        [key]: { status: 'success', data: response, error: null }
      }));
      return response;
    } catch (error) {
      setStates(prev => ({
        ...prev,
        [key]: { status: 'error', data: null, error }
      }));
      throw error;
    }
  }, [asyncFunctions]);

  const getState = useCallback((key) => {
    const state = states[key];
    return {
      ...state,
      isLoading: state.status === 'pending',
      isError: state.status === 'error',
      isSuccess: state.status === 'success',
      isIdle: state.status === 'idle'
    };
  }, [states]);

  const isAnyLoading = Object.values(states).some(state => state.status === 'pending');
  const hasAnyError = Object.values(states).some(state => state.status === 'error');

  return {
    execute,
    getState,
    states,
    isAnyLoading,
    hasAnyError
  };
};

/**
 * Hook para manejar paginación con carga asíncrona
 * @param {Function} fetchFunction - Función para obtener datos
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado de paginación
 */
export const useAsyncPagination = (fetchFunction, options = {}) => {
  const {
    initialPage = 1,
    pageSize = 10,
    immediate = true
  } = options;

  const [page, setPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(async (pageNum = page, reset = false) => {
    const response = await fetchFunction(pageNum, pageSize);
    
    if (reset) {
      setAllData(response.data || []);
    } else {
      setAllData(prev => [...prev, ...(response.data || [])]);
    }
    
    setHasMore(response.hasMore ?? (response.data?.length === pageSize));
    setTotalCount(response.total ?? 0);
    
    return response;
  }, [fetchFunction, page, pageSize]);

  const { execute, status, error, isLoading } = useAsync(
    () => fetchData(page, true),
    immediate
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      await fetchData(nextPage, false);
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  }, [hasMore, isLoading, page, fetchData]);

  const refresh = useCallback(async () => {
    setPage(initialPage);
    setAllData([]);
    setHasMore(true);
    return execute();
  }, [execute, initialPage]);

  const goToPage = useCallback(async (pageNum) => {
    setPage(pageNum);
    return fetchData(pageNum, true);
  }, [fetchData]);

  return {
    data: allData,
    page,
    hasMore,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    isLoading,
    error,
    status,
    loadMore,
    refresh,
    goToPage,
    execute
  };
};

/**
 * Hook para debounce de operaciones asíncronas
 * @param {Function} asyncFunction - Función asíncrona
 * @param {number} delay - Delay en milisegundos
 * @returns {Object} Estado de la operación con debounce
 */
export const useAsyncDebounce = (asyncFunction, delay = 300) => {
  const [debouncedArgs, setDebouncedArgs] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const { execute, ...asyncState } = useAsync(
    (...args) => asyncFunction(...args),
    false
  );

  const debouncedExecute = useCallback((...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setDebouncedArgs(args);
      execute(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }, [execute, delay, timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    execute: debouncedExecute,
    debouncedArgs,
    ...asyncState
  };
};

export default useAsync;
