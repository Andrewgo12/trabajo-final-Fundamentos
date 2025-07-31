import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

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
        const response = await productsAPI.getAll(filters);
        setProducts(response.products);
        setTotal(response.total);
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
        const productData = await productsAPI.getById(id);
        setProduct(productData);
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
        const featuredProducts = await productsAPI.getFeatured();
        setProducts(featuredProducts);
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

export const useNewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const newProducts = await productsAPI.getNew();
        setProducts(newProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

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
        const saleProducts = await productsAPI.getOnSale();
        setProducts(saleProducts);
      } catch (err) {
        setError(err.message);
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
        const relatedProducts = await productsAPI.getRelated(productId);
        setProducts(relatedProducts);
      } catch (err) {
        setError(err.message);
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
        const response = await productsAPI.searchSuggestions(query);
        setSuggestions(response);
      } catch (err) {
        setError(err.message);
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

// Hook for new products
export const useNewProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API call - in real app this would fetch from backend
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock new products data
        const mockNewProducts = [
          {
            id: 'new-1',
            name: 'Limpiador Multiusos Ultra Concentrado',
            description: 'Nueva fórmula ultra concentrada que rinde 3 veces más',
            price: 28900,
            originalPrice: 35900,
            discount: 20,
            rating: 4.9,
            reviewCount: 45,
            image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
            category: 'multiusos',
            brand: 'CleanMaster Pro',
            isNew: true,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            tags: ['concentrado', 'multiusos', 'nuevo', 'eficiente']
          },
          {
            id: 'new-2',
            name: 'Desinfectante Natural con Aceites Esenciales',
            description: 'Desinfectante 100% natural con aroma a lavanda y eucalipto',
            price: 32500,
            originalPrice: 38000,
            discount: 15,
            rating: 4.8,
            reviewCount: 67,
            image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
            category: 'desinfectantes',
            brand: 'EcoClean Natural',
            isNew: true,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            tags: ['natural', 'aceites esenciales', 'desinfectante', 'aromático']
          },
          {
            id: 'new-3',
            name: 'Limpiador de Pisos con Tecnología Anti-Bacteriana',
            description: 'Tecnología avanzada que elimina 99.9% de bacterias y virus',
            price: 24900,
            originalPrice: 29900,
            discount: 17,
            rating: 4.7,
            reviewCount: 89,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            category: 'pisos',
            brand: 'PowerClean Industrial',
            isNew: true,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
            tags: ['antibacteriano', 'pisos', 'tecnología', 'protección']
          },
          {
            id: 'new-4',
            name: 'Kit de Limpieza Eco-Amigable Completo',
            description: 'Kit completo con 5 productos eco-amigables para toda la casa',
            price: 89900,
            originalPrice: 120000,
            discount: 25,
            rating: 4.9,
            reviewCount: 156,
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            category: 'eco-amigables',
            brand: 'EcoClean Natural',
            isNew: true,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            tags: ['kit', 'eco-amigable', 'completo', 'ahorro']
          },
          {
            id: 'new-5',
            name: 'Detergente Líquido con Suavizante Integrado',
            description: 'Detergente 2 en 1 que limpia y suaviza en una sola aplicación',
            price: 36900,
            originalPrice: 42000,
            discount: 12,
            rating: 4.6,
            reviewCount: 234,
            image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
            category: 'detergentes',
            brand: 'CleanMaster Pro',
            isNew: true,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            tags: ['detergente', '2en1', 'suavizante', 'práctico']
          },
          {
            id: 'new-6',
            name: 'Spray Desengrasante Industrial Extra Fuerte',
            description: 'Desengrasante profesional para cocinas industriales y comerciales',
            price: 45900,
            originalPrice: 52000,
            discount: 12,
            rating: 4.8,
            reviewCount: 78,
            image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400',
            category: 'desengrasantes',
            brand: 'PowerClean Industrial',
            isNew: true,
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            tags: ['desengrasante', 'industrial', 'extra fuerte', 'profesional']
          }
        ];

        setProducts(mockNewProducts);
      } catch (err) {
        setError('Error al cargar los productos nuevos');
        console.error('Error fetching new products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, [filters]);

  return { products, loading, error };
};
