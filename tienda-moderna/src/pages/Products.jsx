import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown, X, Star, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useFiltersStore } from '../stores/useStore';
import { categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    filters,
    searchQuery,
    setFilter,
    setSearchQuery,
    clearFilters
  } = useFiltersStore();

  const { products, loading, error, total } = useProducts({
    ...filters,
    search: searchQuery,
    page: currentPage
  });

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const totalPages = Math.ceil(total / (filters.limit || 12));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Todos los Productos
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Cargando...' : `${total} productos encontrados`}
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Buscar productos..."
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
                      onClick={clearFilters}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Limpiar
                    </button>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categorías</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={filters.category === ''}
                      onChange={(e) => setFilter('category', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Todas</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) => setFilter('category', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        {category.icon} {category.name}
                      </span>
                    </label>
                  ))}
                </div>
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
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <Button onClick={clearFilters}>
                  Limpiar Filtros
                </Button>
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

              {/* Pagination */}
              {!loading && products.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>

                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNumber = currentPage <= 3
                        ? index + 1
                        : currentPage + index - 2;

                      if (pageNumber > totalPages) return null;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === pageNumber
                              ? 'text-white bg-primary-600 border border-primary-600'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!loading && products.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Intenta ajustar tus filtros o buscar con otros términos
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setSelectedBrand('');
                      setPriceRange([0, 200000]);
                      setSelectedRating(0);
                    }}
                    className="btn btn-primary"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              )}
            )}

            {/* Recently Viewed Products */}
            {!loading && products.length > 0 && (
              <div className="mt-16 border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Productos Vistos Recientemente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Aquí se mostrarían los productos vistos recientemente */}
                  {products.slice(0, 4).map((product) => (
                    <ProductCard key={`recent-${product.id}`} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filters Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(true)}
            className="btn btn-outline btn-sm flex-1 mr-2"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {(selectedCategory || selectedBrand || selectedRating > 0) && (
              <Badge variant="primary" className="badge badge-primary ml-2">
                {[selectedCategory, selectedBrand, selectedRating > 0].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="btn btn-outline btn-sm"
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
