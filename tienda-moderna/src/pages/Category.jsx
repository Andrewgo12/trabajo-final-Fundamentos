import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Filter, Grid, List, ChevronDown, X, ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useFiltersStore } from '../stores/useStore';
import { categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import Card from '../components/ui/Card';

const Category = () => {
  const { categoryId } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    filters, 
    searchQuery, 
    setFilter, 
    setSearchQuery, 
    clearFilters 
  } = useFiltersStore();
  
  // Set category filter when component mounts or categoryId changes
  useEffect(() => {
    setFilter('category', categoryId);
  }, [categoryId, setFilter]);
  
  const { products, loading, error, total } = useProducts({
    ...filters,
    search: searchQuery,
    category: categoryId
  });

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

  // Find current category
  const currentCategory = categories.find(cat => cat.id === categoryId);

  const handleSortChange = (sortBy, sortOrder = 'asc') => {
    setFilter('sortBy', sortBy);
    setFilter('sortOrder', sortOrder);
  };

  const handlePriceRangeChange = (min, max) => {
    setFilter('priceRange', [min, max]);
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 200000;
    return value !== '' && value !== 0 && value !== categoryId; // Exclude current category from count
  }).length + (searchQuery ? 1 : 0);

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Categoría no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            La categoría que buscas no existe.
          </p>
          <Link to="/products">
            <Button>Ver Todos los Productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-primary-600">
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary-600">
              Productos
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{currentCategory.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/products"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{currentCategory.icon}</span>
                  <h1 className="text-3xl font-display font-bold text-gray-900">
                    {currentCategory.name}
                  </h1>
                </div>
                <p className="text-gray-600">
                  {currentCategory.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {loading ? 'Cargando...' : `${total} productos encontrados`}
                </p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder={`Buscar en ${currentCategory.name}...`}
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
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {activeFiltersCount}
                    </Badge>
                    <button
                      onClick={() => {
                        clearFilters();
                        setFilter('category', categoryId); // Keep category filter
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Limpiar
                    </button>
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6">
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
              <div className="mb-6">
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

              {/* Other Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Otras Categorías</h4>
                <div className="space-y-2">
                  {categories
                    .filter(cat => cat.id !== categoryId)
                    .map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleSortChange(sortBy, sortOrder);
                  }}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="name-asc">Nombre A-Z</option>
                  <option value="name-desc">Nombre Z-A</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating-desc">Mejor Calificados</option>
                  <option value="newest-desc">Más Nuevos</option>
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

            {/* Products */}
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
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay productos en esta categoría
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o explora otras categorías
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => {
                    clearFilters();
                    setFilter('category', categoryId);
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
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
