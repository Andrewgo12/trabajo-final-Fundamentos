import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  showCount = false,
  count = 0,
  precision = 1, // 1 = whole stars, 0.5 = half stars, 0.1 = decimal
  className = '',
  starClassName = '',
  emptyColor = 'text-gray-300',
  fillColor = 'text-yellow-400',
  hoverColor = 'text-yellow-500',
  ...props
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const currentValue = isHovering && interactive ? hoverValue : value;

  const handleStarClick = (starValue) => {
    if (!interactive || !onChange) return;
    
    let newValue;
    if (precision === 0.5) {
      // Half star precision
      newValue = starValue;
    } else if (precision === 0.1) {
      // Decimal precision
      newValue = Math.round(starValue * 10) / 10;
    } else {
      // Whole star precision
      newValue = Math.ceil(starValue);
    }
    
    onChange(newValue);
  };

  const handleStarHover = (starValue) => {
    if (!interactive) return;
    setHoverValue(starValue);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovering(false);
    setHoverValue(0);
  };

  const getStarFillPercentage = (starIndex) => {
    const starValue = starIndex + 1;
    if (currentValue >= starValue) {
      return 100;
    } else if (currentValue > starIndex) {
      return (currentValue - starIndex) * 100;
    }
    return 0;
  };

  const renderStar = (index) => {
    const starValue = index + 1;
    const fillPercentage = getStarFillPercentage(index);
    const isHovered = interactive && isHovering && hoverValue >= starValue;

    return (
      <motion.div
        key={index}
        className={`relative ${interactive ? 'cursor-pointer' : ''}`}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleStarHover(starValue)}
        onMouseMove={(e) => {
          if (!interactive || precision === 1) return;
          
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const width = rect.width;
          const percentage = x / width;
          
          let hoverVal;
          if (precision === 0.5) {
            hoverVal = index + (percentage > 0.5 ? 1 : 0.5);
          } else {
            hoverVal = index + percentage;
          }
          
          setHoverValue(Math.min(hoverVal, max));
        }}
      >
        {/* Empty star */}
        <Star 
          className={`${sizeClasses[size]} ${emptyColor} ${starClassName}`}
          fill="currentColor"
        />
        
        {/* Filled star */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star 
            className={`${sizeClasses[size]} ${
              isHovered ? hoverColor : fillColor
            } ${starClassName}`}
            fill="currentColor"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Stars */}
      <div className="flex items-center">
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>

      {/* Value display */}
      {showValue && (
        <span className={`ml-2 font-medium text-gray-700 ${textSizeClasses[size]}`}>
          {currentValue.toFixed(precision === 1 ? 0 : 1)}
        </span>
      )}

      {/* Count display */}
      {showCount && count > 0 && (
        <span className={`ml-1 text-gray-500 ${textSizeClasses[size]}`}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

// Preset rating components
export const ProductRating = ({ 
  rating, 
  reviewCount, 
  size = 'sm',
  showValue = true,
  showCount = true,
  ...props 
}) => (
  <Rating
    value={rating}
    size={size}
    showValue={showValue}
    showCount={showCount}
    count={reviewCount}
    {...props}
  />
);

export const InteractiveRating = ({ 
  value, 
  onChange, 
  size = 'lg',
  precision = 1,
  ...props 
}) => (
  <Rating
    value={value}
    onChange={onChange}
    size={size}
    precision={precision}
    interactive
    showValue
    {...props}
  />
);

export const CompactRating = ({ 
  rating, 
  reviewCount,
  ...props 
}) => (
  <Rating
    value={rating}
    size="xs"
    showValue
    showCount
    count={reviewCount}
    className="text-xs"
    {...props}
  />
);

// Rating summary component
export const RatingSummary = ({ 
  ratings = [], // Array of { stars: 5, count: 10 }
  totalReviews = 0,
  averageRating = 0,
  className = ''
}) => {
  const maxCount = Math.max(...ratings.map(r => r.count));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Overall rating */}
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-gray-900">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <Rating value={averageRating} size="lg" />
          <div className="text-sm text-gray-600 mt-1">
            {totalReviews.toLocaleString()} reseñas
          </div>
        </div>
      </div>

      {/* Rating breakdown */}
      <div className="space-y-2">
        {ratings.map((rating, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm text-gray-600">{rating.stars}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
            
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${maxCount > 0 ? (rating.count / maxCount) * 100 : 0}%` 
                }}
              />
            </div>
            
            <div className="text-sm text-gray-600 w-12 text-right">
              {rating.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
