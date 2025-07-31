import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showInfo = true,
  showSizeSelector = false,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  maxVisiblePages = 7,
  className = '',
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'simple', 'compact'
  ...props
}) => {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  // Calculate item range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // Simple variant (just prev/next)
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-between ${className}`} {...props}>
        {showInfo && (
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{startItem}</span> a{' '}
            <span className="font-medium">{endItem}</span> de{' '}
            <span className="font-medium">{totalItems}</span> resultados
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size={size}
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="btn btn-outline"
          >
            <ChevronLeft className={iconSizeClasses[size]} />
            Anterior
          </Button>
          
          <Button
            variant="outline"
            size={size}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="btn btn-outline"
          >
            Siguiente
            <ChevronRight className={iconSizeClasses[size]} />
          </Button>
        </div>
      </div>
    );
  }

  // Compact variant (minimal)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`} {...props}>
        <Button
          variant="ghost"
          size={size}
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="btn btn-ghost"
        >
          <ChevronLeft className={iconSizeClasses[size]} />
        </Button>
        
        <span className="text-sm text-gray-700 px-2">
          {currentPage} de {totalPages}
        </span>
        
        <Button
          variant="ghost"
          size={size}
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="btn btn-ghost"
        >
          <ChevronRight className={iconSizeClasses[size]} />
        </Button>
      </div>
    );
  }

  // Default variant (full pagination)
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {/* Info and Page Size Selector */}
      {(showInfo || showSizeSelector) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {showInfo && (
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{startItem}</span> a{' '}
              <span className="font-medium">{endItem}</span> de{' '}
              <span className="font-medium">{totalItems}</span> resultados
            </div>
          )}
          
          {showSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Mostrar:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
                className="input input-sm"
              >
                {pageSizeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">por página</span>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-center">
        <nav className="flex items-center gap-1" aria-label="Pagination">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size={size}
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="btn btn-ghost"
            aria-label="Página anterior"
          >
            <ChevronLeft className={iconSizeClasses[size]} />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {visiblePages.map((page, index) => {
              if (typeof page === 'string') {
                // Ellipsis
                return (
                  <div
                    key={page}
                    className={`${sizeClasses[size]} flex items-center justify-center text-gray-400`}
                  >
                    <MoreHorizontal className={iconSizeClasses[size]} />
                  </div>
                );
              }

              const isActive = page === currentPage;
              
              return (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`
                    ${sizeClasses[size]} min-w-[2.5rem] flex items-center justify-center
                    rounded-lg font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Ir a la página ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size={size}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className="btn btn-ghost"
            aria-label="Página siguiente"
          >
            <ChevronRight className={iconSizeClasses[size]} />
          </Button>
        </nav>
      </div>
    </div>
  );
};

// Hook for pagination logic
export const usePagination = ({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
  onPageChange,
  onPageSizeChange
}) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);
  const [pageSize, setPageSize] = React.useState(itemsPerPage);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page
    onPageSizeChange?.(newSize);
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);
  const goToNextPage = () => handlePageChange(Math.min(currentPage + 1, totalPages));
  const goToPreviousPage = () => handlePageChange(Math.max(currentPage - 1, 1));

  // Calculate current items
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
    handlePageSizeChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

export default Pagination;
