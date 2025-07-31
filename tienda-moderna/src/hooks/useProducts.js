import { useState, useEffect } from 'react';
import { api } from '../services/apiClient';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getAll(filters);
        setProducts(response.data.data || response.data.items || []);
        setTotal(response.data.pagination?.total || response.data.total || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error, total };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getById(id);
        setProduct(response.data.data || response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getFeatured();
        setProducts(response.data.data || response.data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, loading, error };
};

export const useNewProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getNew(filters);
        setProducts(response.data.data || response.data.items || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al cargar productos nuevos');
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, [filters]);

  return { products, loading, error };
};

export const useSaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getOnSale();
        setProducts(response.data.data || response.data.items || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al cargar productos en oferta');
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  return { products, loading, error };
};

export const useRelatedProducts = (productId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.products.getRelated(productId);
        setProducts(response.data.data || response.data.items || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al cargar productos relacionados');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  return { products, loading, error };
};

export const useSearchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.search.suggestions({ q: query });
        setSuggestions(response.data.data || response.data.suggestions || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al obtener sugerencias');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading, error };
};
