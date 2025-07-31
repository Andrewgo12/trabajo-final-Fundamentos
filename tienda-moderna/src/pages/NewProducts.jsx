import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Star, 
  Sparkles, 
  TrendingUp, 
  Filter, 
  Grid, 
  List,
  Clock,
  Badge as BadgeIcon,
  Search,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNewProducts } from '../hooks/useProducts';
import { useFiltersStore } from '../stores/useStore';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Breadcrumb from '../components/ui/Breadcrumb';

const NewProducts = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all'); // all, week, month, quarter
  
  const { 
    filters, 
    searchQuery, 
    setFilter, 
    setSearchQuery, 
    clearFilters 
  } = useFiltersStore();
  
  const { products: newProducts, loading, error } = useNewProducts();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

  // Filter products by time period
  const filterByTime = (products) => {
    const now = new Date();
    const timeFilters = {
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      quarter: 90 * 24 * 60 * 60 * 1000
    };

    if (timeFilter === 'all') return products;
    
    const timeLimit = timeFilters[timeFilter];
    return products.filter(product => {
      const productDate = new Date(product.createdAt || product.launchDate);
      return (now - productDate) <= timeLimit;
    });
  };

  // Apply all filters
  const filteredProducts = filterByTime(newProducts).filter(product => {
    // Search filter
    if (localSearchQuery) {
      const searchTerm = localSearchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (product.category !== filters.category) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }

    return true;
  });

  // Sort products by newest first
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.launchDate);
    const dateB = new Date(b.createdAt || b.launchDate);
    return dateB - dateA;
  });

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 200000;
    return value !== '' && value !== 0 && value !== 'all';
  }).length + (searchQuery ? 1 : 0) + (timeFilter !== 'all' ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-primary-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-accent-300" />
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Nuevos Productos
                </h1>
              </div>
              <p className="text-xl text-primary-100 max-w-2xl">
                Descubre las últimas incorporaciones a nuestro catálogo. 
                Productos innovadores y de alta calidad recién llegados.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">{sortedProducts.length}</div>
              <div className="text-primary-100 text-sm">Productos Nuevos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">
                {sortedProducts.filter(p => {
                  const date = new Date(p.createdAt || p.launchDate);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return date > weekAgo;
                }).length}
              </div>
              <div className="text-primary-100 text-sm">Esta Semana</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">
                {Math.round(sortedProducts.reduce((acc, p) => acc + (p.rating || 0), 0) / sortedProducts.length * 10) / 10 || 0}
              </div>
              <div className="text-primary-100 text-sm">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Productos', href: '/products' },
          { label: 'Nuevos Productos' }
        ]} className="mb-8" />

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar nuevos productos..."
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
            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Todos los tiempos</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Últimos 3 meses</option>
            </select>

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
                        onClick={() => {
                          clearFilters();
                          setTimeFilter('all');
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Limpiar
                      </button>
                    </div>
                  )}
                </div>
              </Card.Header>
              <Card.Content className="space-y-6">
                {/* Launch Period */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Período de Lanzamiento</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Todos los tiempos' },
                      { value: 'week', label: 'Última semana' },
                      { value: 'month', label: 'Último mes' },
                      { value: 'quarter', label: 'Últimos 3 meses' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="timeFilter"
                          value={option.value}
                          checked={timeFilter === option.value}
                          onChange={(e) => setTimeFilter(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Todas las categorías' },
                      { value: 'multiusos', label: 'Multiusos' },
                      { value: 'desinfectantes', label: 'Desinfectantes' },
                      { value: 'eco-amigables', label: 'Eco-amigables' },
                      { value: 'pisos', label: 'Pisos' }
                    ].map((category) => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={(filters.category || 'all') === category.value}
                          onChange={(e) => setFilter('category', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{category.label}</span>
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
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos nuevos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o vuelve más tarde para ver nuevos lanzamientos
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => {
                    clearFilters();
                    setTimeFilter('all');
                  }}>
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
                  <div key={product.id} className="relative">
                    <ProductCard 
                      product={product}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                    {/* New Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="success" className="bg-green-500 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Nuevo
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
