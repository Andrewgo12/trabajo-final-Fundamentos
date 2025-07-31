import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/apiClient';

// Hook para manejar llamadas a la API con estado de loading y error
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback((...args) => {
    return fetchData(...args);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    setData
  };
};

// Hook para mutaciones (POST, PUT, DELETE)
export const useMutation = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(...args);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return {
    mutate,
    loading,
    error,
    setError
  };
};

// Hook para paginación
export const usePagination = (apiCall, initialParams = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async (newParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = { ...params, ...newParams };
      const response = await apiCall(queryParams);
      
      if (newParams.page === 1 || !newParams.page) {
        setData(response.data.data || response.data.items || []);
      } else {
        // Para load more
        setData(prev => [...prev, ...(response.data.data || response.data.items || [])]);
      }
      
      setPagination(response.data.pagination || {});
      setParams(queryParams);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall, params]);

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = useCallback(() => {
    if (pagination.hasNext && !loading) {
      fetchData({ page: pagination.page + 1 });
    }
  }, [fetchData, pagination.hasNext, pagination.page, loading]);

  const refresh = useCallback(() => {
    fetchData({ page: 1 });
  }, [fetchData]);

  const updateParams = useCallback((newParams) => {
    fetchData({ ...newParams, page: 1 });
  }, [fetchData]);

  return {
    data,
    pagination,
    loading,
    error,
    loadMore,
    refresh,
    updateParams,
    setData
  };
};

// Hook para búsqueda con debounce
export const useSearch = (apiCall, delay = 500) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall({ q: query });
        setResults(response.data.data || response.data.suggestions || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [query, apiCall, delay]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearResults: () => setResults([])
  };
};

// Hook para optimistic updates
export const useOptimisticUpdate = (apiCall, updateFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = useCallback(async (optimisticData, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      // Apply optimistic update
      updateFn(optimisticData);
      
      // Make API call
      const response = await apiCall(...args);
      
      // Update with real data
      updateFn(response.data);
      
      return response.data;
    } catch (err) {
      // Revert optimistic update on error
      updateFn(null, true); // true indicates revert
      setError(err.response?.data?.message || err.message || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall, updateFn]);

  return {
    update,
    loading,
    error
  };
};

export default useApi;
