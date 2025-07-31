import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, X, Flame, Clock, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSaleProducts } from '../hooks/useProducts';
import { useFiltersStore } from '../stores/useStore';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const Offers = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    filters, 
    searchQuery, 
    setFilter, 
    setSearchQuery, 
    clearFilters 
  } = useFiltersStore();
  
  const { products: saleProducts, loading, error } = useSaleProducts();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

  // Filter sale products based on search and filters
  const filteredProducts = saleProducts.filter(product => {
    // Search filter
    if (localSearchQuery) {
      const searchTerm = localSearchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      if (!matchesSearch) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }

    // Rating filter
    if (filters.rating > 0) {
      if (product.rating < filters.rating) return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    
    switch (filters.sortBy) {
      case 'price':
        return (a.price - b.price) * order;
      case 'rating':
        return (a.rating - b.rating) * order;
      case 'name':
        return a.name.localeCompare(b.name) * order;
      case 'discount':
        return (a.discount - b.discount) * order;
      default:
        return 0;
    }
  });

  const handleSortChange = (sortBy, sortOrder = 'asc') => {
    setFilter('sortBy', sortBy);
    setFilter('sortOrder', sortOrder);
  };

  const handlePriceRangeChange = (min, max) => {
    setFilter('priceRange', [min, max]);
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 200000;
    return value !== '' && value !== 0;
  }).length + (searchQuery ? 1 : 0);

  // Calculate total savings
  const totalSavings = sortedProducts.reduce((total, product) => {
    return total + (product.originalPrice - product.price);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-orange-300" />
              <h1 className="text-4xl lg:text-6xl font-bold">
                Ofertas Especiales
              </h1>
              <Flame className="w-8 h-8 text-orange-300" />
            </div>
            <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
              Descubre increíbles descuentos en productos de limpieza de alta calidad. 
              ¡Ofertas por tiempo limitado!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Badge variant="accent" size="lg" className="text-white bg-white/20">
                <Percent className="w-4 h-4 mr-1" />
                Hasta 50% de descuento
              </Badge>
              <Badge variant="accent" size="lg" className="text-white bg-white/20">
                <Clock className="w-4 h-4 mr-1" />
                Ofertas limitadas
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {sortedProducts.length}
              </div>
              <div className="text-gray-600">Productos en oferta</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                ${totalSavings.toLocaleString()}
              </div>
              <div className="text-gray-600">Ahorro total disponible</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {Math.max(...sortedProducts.map(p => p.discount))}%
              </div>
              <div className="text-gray-600">Descuento máximo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar ofertas..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              rightIcon={
                localSearchQuery && (
                  <button
                    onClick={() => setLocalSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="primary" size="sm" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            {/* Sort */}
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleSortChange(sortBy, sortOrder);
              }}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="discount-desc">Mayor Descuento</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Calificados</option>
              <option value="name-asc">Nombre A-Z</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                  {activeFiltersCount > 0 && (
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {activeFiltersCount}
                      </Badge>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Limpiar
                      </button>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Content className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rango de Precio</h4>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                        className="text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value) || 200000)}
                        className="text-sm"
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Calificación</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={0}
                        checked={filters.rating === 0}
                        onChange={(e) => setFilter('rating', parseInt(e.target.value))}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Todas</span>
                    </label>
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating}
                          onChange={(e) => setFilter('rating', parseInt(e.target.value))}
                          className="mr-2"
                        />
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700 mr-1">{rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-1">y más</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-t-xl"></div>
                    <div className="bg-white p-6 rounded-b-xl border border-gray-100">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Intentar de nuevo
                </Button>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron ofertas
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o vuelve más tarde para nuevas ofertas
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={clearFilters}>
                    Limpiar Filtros
                  </Button>
                  <Link to="/products">
                    <Button variant="outline">
                      Ver Todos los Productos
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}

            {/* Flash Sale Banner */}
            {sortedProducts.length > 0 && (
              <div className="mt-12">
                <Card className="card bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <div className="card-content text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Flame className="w-6 h-6 text-orange-300" />
                      <h3 className="text-2xl font-bold">¡Venta Flash!</h3>
                      <Flame className="w-6 h-6 text-orange-300" />
                    </div>
                    <p className="text-red-100 mb-6">
                      Descuentos adicionales del 10% en tu primera compra de ofertas
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="accent" className="btn btn-accent">
                        Aplicar Descuento
                      </Button>
                      <Button variant="outline" className="btn btn-outline border-white text-white hover:bg-white hover:text-red-600">
                        Ver Términos
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Deal of the Day */}
            <div className="mt-12 border-t border-gray-200 pt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Oferta del Día
                </h2>
                <p className="text-gray-600">
                  Una oferta especial que cambia cada día. ¡No te la pierdas!
                </p>
              </div>

              <Card className="card max-w-2xl mx-auto border-2 border-red-200">
                <div className="card-content">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/3">
                      <img
                        src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop"
                        alt="Producto del día"
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <Badge variant="error" className="badge badge-error mb-3">
                        Oferta del Día
                      </Badge>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Limpiador Multiusos Premium
                      </h3>
                      <p className="text-gray-600 mb-4">
                        El limpiador más efectivo para todas las superficies de tu hogar
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <span className="text-3xl font-bold text-red-600">$19.900</span>
                        <span className="text-xl text-gray-500 line-through">$39.900</span>
                        <Badge variant="error" className="badge badge-error">
                          50% OFF
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-medium">
                          Termina en: 23:45:12
                        </span>
                      </div>
                      <Button className="btn btn-primary w-full md:w-auto">
                        Comprar Ahora
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bulk Discount Info */}
            <div className="mt-12 border-t border-gray-200 pt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Descuentos por Volumen
                </h2>
                <p className="text-gray-600">
                  Ahorra más comprando en cantidad
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quantity: '3-5 productos',
                    discount: '5%',
                    color: 'bg-blue-50 border-blue-200 text-blue-800'
                  },
                  {
                    quantity: '6-10 productos',
                    discount: '10%',
                    color: 'bg-green-50 border-green-200 text-green-800'
                  },
                  {
                    quantity: '11+ productos',
                    discount: '15%',
                    color: 'bg-purple-50 border-purple-200 text-purple-800'
                  }
                ].map((tier, index) => (
                  <Card key={index} className={`card border-2 ${tier.color}`}>
                    <div className="card-content text-center">
                      <div className="text-4xl font-bold mb-2">{tier.discount}</div>
                      <div className="text-lg font-semibold mb-2">Descuento</div>
                      <div className="text-sm opacity-75">{tier.quantity}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter for Offers */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <Card className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white">
            <div className="card-content text-center">
              <h2 className="text-3xl font-bold mb-4">
                No Te Pierdas Ninguna Oferta
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Suscríbete para recibir notificaciones de nuevas ofertas y descuentos exclusivos
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="input flex-1 bg-white text-gray-900"
                />
                <Button variant="accent" className="btn btn-accent">
                  Suscribirse
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Offers;
