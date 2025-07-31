import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  Package, 
  Tag, 
  Filter,
  Mic,
  Camera,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import { useSearchStore } from '../../stores/useStore';
import { useSearchSuggestions } from '../../hooks/useProducts';

const SearchBar = ({
  placeholder = 'Buscar productos de limpieza...',
  showSuggestions = true,
  showFilters = false,
  showVoiceSearch = false,
  showImageSearch = false,
  autoFocus = false,
  onSearch,
  onFilterClick,
  className = '',
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'minimal', 'expanded'
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const {
    searchHistory,
    recentSearches,
    popularSearches,
    addToHistory,
    addToRecent,
    removeFromHistory,
    clearHistory
  } = useSearchStore();

  const { suggestions, loading: suggestionsLoading } = useSearchSuggestions(query);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.length > 0 || isExpanded);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
    setShowDropdown(true);
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    const trimmedQuery = searchQuery.trim();
    
    // Add to history
    addToHistory(trimmedQuery);
    addToRecent(trimmedQuery);
    
    // Close dropdown
    setShowDropdown(false);
    setIsExpanded(false);
    
    // Blur input
    inputRef.current?.blur();
    
    // Execute search
    if (onSearch) {
      onSearch(trimmedQuery);
    } else {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.value);
    handleSearch(suggestion.value);
  };

  const handleHistoryClick = (historyItem) => {
    setQuery(historyItem);
    handleSearch(historyItem);
  };

  const handleClearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'product':
        return Package;
      case 'brand':
        return Tag;
      case 'category':
        return Filter;
      default:
        return Search;
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  };

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Search Input */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          rightIcon={
            <div className="flex items-center gap-1">
              {query && (
                <button
                  onClick={handleClearQuery}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              {showVoiceSearch && (
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Búsqueda por voz"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
              
              {showImageSearch && (
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Búsqueda por imagen"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
              
              {showFilters && (
                <button
                  onClick={onFilterClick}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Filtros"
                >
                  <Filter className="w-4 h-4" />
                </button>
              )}
            </div>
          }
          className={`input ${sizeClasses[size]} pr-20`}
        />
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {showDropdown && showSuggestions && (
          <motion.div
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Suggestions */}
            {query && suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                  Sugerencias
                </div>
                {suggestions.map((suggestion, index) => {
                  const IconComponent = getSuggestionIcon(suggestion.type);
                  return (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <IconComponent className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="flex-1 text-gray-900">{suggestion.value}</span>
                      <Badge variant="outline" className="badge badge-outline text-xs">
                        {suggestion.type}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Búsquedas Recientes
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Limpiar
                  </button>
                </div>
                {recentSearches.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="flex-1 text-gray-900">{item}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && popularSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
                  Búsquedas Populares
                </div>
                {popularSearches.slice(0, 6).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryClick(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="flex-1 text-gray-900">{item}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && suggestions.length === 0 && !suggestionsLoading && (
              <div className="p-4 text-center text-gray-500">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">No se encontraron sugerencias</p>
                <p className="text-xs text-gray-400 mt-1">
                  Presiona Enter para buscar "{query}"
                </p>
              </div>
            )}

            {/* Loading */}
            {suggestionsLoading && (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Compact search bar for mobile
export const CompactSearchBar = ({ onSearch, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="btn btn-ghost btn-sm"
        {...props}
      >
        <Search className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 'auto', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
          if (e.key === 'Escape') setIsExpanded(false);
        }}
        placeholder="Buscar..."
        className="input input-sm w-48"
        autoFocus
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(false)}
        className="btn btn-ghost btn-sm"
      >
        <X className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default SearchBar;
