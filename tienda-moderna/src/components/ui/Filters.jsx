import React, { useState } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Check,
  Sliders,
  RotateCcw,
  Tag,
  DollarSign,
  Package,
  Leaf,
  Zap,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Badge from './Badge';
import Card from './Card';
import { useFiltersStore } from '../../stores/useStore';

const Filters = ({
  showMobileModal = false,
  onCloseMobile,
  className = '',
  ...props
}) => {
  const {
    filters,
    setFilter,
    setMultipleFilters,
    clearFilters,
    getActiveFiltersCount,
    hasActiveFilters
  } = useFiltersStore();

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    features: true
  });

  const categories = [
    { id: 'multipurpose', name: 'Multiusos', count: 45, icon: Package },
    { id: 'kitchen', name: 'Cocina', count: 38, icon: Package },
    { id: 'bathroom', name: 'Baño', count: 32, icon: Package },
    { id: 'floors', name: 'Pisos', count: 29, icon: Package },
    { id: 'laundry', name: 'Lavandería', count: 41, icon: Package },
    { id: 'glass', name: 'Cristales', count: 18, icon: Package },
    { id: 'disinfectants', name: 'Desinfectantes', count: 35, icon: Shield },
    { id: 'eco', name: 'Eco-Amigables', count: 33, icon: Leaf }
  ];

  const brands = [
    { id: 'cleanmaster', name: 'CleanMaster Pro', count: 45 },
    { id: 'ecoclean', name: 'EcoClean Natural', count: 28 },
    { id: 'powerclean', name: 'PowerClean Industrial', count: 67 },
    { id: 'freshhome', name: 'FreshHome', count: 32 },
    { id: 'aquapure', name: 'AquaPure', count: 19 },
    { id: 'sparklemax', name: 'SparkleMax', count: 24 }
  ];

  const priceRanges = [
    { id: 'under-10000', label: 'Menos de $10.000', min: 0, max: 10000 },
    { id: '10000-25000', label: '$10.000 - $25.000', min: 10000, max: 25000 },
    { id: '25000-50000', label: '$25.000 - $50.000', min: 25000, max: 50000 },
    { id: '50000-100000', label: '$50.000 - $100.000', min: 50000, max: 100000 },
    { id: 'over-100000', label: 'Más de $100.000', min: 100000, max: 999999 }
  ];

  const features = [
    { id: 'inStock', label: 'En Stock', icon: Package },
    { id: 'featured', label: 'Destacados', icon: Star },
    { id: 'eco', label: 'Eco-Amigable', icon: Leaf },
    { id: 'onSale', label: 'En Oferta', icon: Tag },
    { id: 'fastShipping', label: 'Envío Rápido', icon: Zap }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFilter('category', filters.category === categoryId ? '' : categoryId);
  };

  const handleBrandChange = (brandId) => {
    const currentBrands = filters.brand || [];
    const newBrands = currentBrands.includes(brandId)
      ? currentBrands.filter(id => id !== brandId)
      : [...currentBrands, brandId];
    setFilter('brand', newBrands);
  };

  const handlePriceRangeChange = (min, max) => {
    setFilter('priceRange', [min, max]);
  };

  const handleRatingChange = (rating) => {
    setFilter('rating', filters.rating === rating ? 0 : rating);
  };

  const handleFeatureChange = (feature) => {
    setFilter(feature, !filters[feature]);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const FilterSection = ({ title, isExpanded, onToggle, children, count }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 px-4 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{title}</span>
          {count > 0 && (
            <Badge variant="outline" className="badge badge-outline text-xs">
              {count}
            </Badge>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const filtersContent = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          {hasActiveFilters() && (
            <Badge variant="primary" className="badge badge-primary">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="btn btn-ghost btn-sm text-gray-500"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Limpiar
            </Button>
          )}
          
          {showMobileModal && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCloseMobile}
              className="btn btn-ghost btn-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Categories */}
      <FilterSection
        title="Categorías"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection('category')}
        count={categories.filter(cat => cat.id === filters.category).length}
      >
        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <label
                key={category.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  filters.category === category.id
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}>
                  {filters.category === category.id && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <IconComponent className="w-4 h-4 text-gray-400" />
                <span className="flex-1 text-sm text-gray-700">{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Brands */}
      <FilterSection
        title="Marcas"
        isExpanded={expandedSections.brand}
        onToggle={() => toggleSection('brand')}
        count={filters.brand?.length || 0}
      >
        <div className="space-y-2">
          {brands.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.brand?.includes(brand.id) || false}
                onChange={() => handleBrandChange(brand.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                filters.brand?.includes(brand.id)
                  ? 'border-primary-600 bg-primary-600'
                  : 'border-gray-300'
              }`}>
                {filters.brand?.includes(brand.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="flex-1 text-sm text-gray-700">{brand.name}</span>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection
        title="Rango de Precio"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
        count={filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) ? 1 : 0}
      >
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="priceRange"
                checked={
                  filters.priceRange &&
                  filters.priceRange[0] === range.min &&
                  filters.priceRange[1] === range.max
                }
                onChange={() => handlePriceRangeChange(range.min, range.max)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                filters.priceRange &&
                filters.priceRange[0] === range.min &&
                filters.priceRange[1] === range.max
                  ? 'border-primary-600 bg-primary-600'
                  : 'border-gray-300'
              }`}>
                {filters.priceRange &&
                 filters.priceRange[0] === range.min &&
                 filters.priceRange[1] === range.max && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="flex-1 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title="Calificación"
        isExpanded={expandedSections.rating}
        onToggle={() => toggleSection('rating')}
        count={filters.rating > 0 ? 1 : 0}
      >
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                filters.rating === rating
                  ? 'border-primary-600 bg-primary-600'
                  : 'border-gray-300'
              }`}>
                {filters.rating === rating && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-700">y más</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection
        title="Características"
        isExpanded={expandedSections.features}
        onToggle={() => toggleSection('features')}
        count={features.filter(feature => filters[feature.id]).length}
      >
        <div className="space-y-2">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <label
                key={feature.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters[feature.id] || false}
                  onChange={() => handleFeatureChange(feature.id)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  filters[feature.id]
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300'
                }`}>
                  {filters[feature.id] && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <IconComponent className="w-4 h-4 text-gray-400" />
                <span className="flex-1 text-sm text-gray-700">{feature.label}</span>
              </label>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );

  // Mobile modal version
  if (showMobileModal) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4"
        onClick={onCloseMobile}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto max-h-full">
            {filtersContent}
          </div>
          
          {/* Mobile Actions */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="btn btn-outline flex-1"
                disabled={!hasActiveFilters()}
              >
                Limpiar Filtros
              </Button>
              <Button
                onClick={onCloseMobile}
                className="btn btn-primary flex-1"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Desktop sidebar version
  return (
    <Card className={`card sticky top-4 ${className}`} {...props}>
      {filtersContent}
    </Card>
  );
};

export default Filters;
