import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 0,
  offset = 8,
  className = '',
  contentClassName = '',
  disabled = false,
  arrow = true,
  maxWidth = 200,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  // Position calculations
  const calculatePosition = () => {
    if (!triggerRef.current) return { x: 0, y: 0 };

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'bottom':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.bottom + scrollY + offset;
        break;
      case 'left':
        x = triggerRect.left + scrollX - offset;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + scrollX + offset;
        y = triggerRect.top + scrollY + triggerRect.height / 2;
        break;
      case 'top-start':
        x = triggerRect.left + scrollX;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'top-end':
        x = triggerRect.right + scrollX;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'bottom-start':
        x = triggerRect.left + scrollX;
        y = triggerRect.bottom + scrollY + offset;
        break;
      case 'bottom-end':
        x = triggerRect.right + scrollX;
        y = triggerRect.bottom + scrollY + offset;
        break;
      default:
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - offset;
    }

    return { x, y };
  };

  // Show tooltip
  const showTooltip = () => {
    if (disabled) return;

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setTooltipPosition(calculatePosition());
        setIsVisible(true);
      }, delay);
    } else {
      setTooltipPosition(calculatePosition());
      setIsVisible(true);
    }
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  // Event handlers
  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'hover-focus') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' || trigger === 'hover-focus') {
      hideTooltip();
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus' || trigger === 'hover-focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus' || trigger === 'hover-focus') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  // Update position on scroll/resize
  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      setTooltipPosition(calculatePosition());
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, position, offset]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Get transform origin based on position
  const getTransformOrigin = () => {
    switch (position) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return 'bottom';
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return 'bottom';
    }
  };

  // Get tooltip alignment classes
  const getAlignmentClasses = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'transform -translate-x-1/2';
      case 'top-start':
      case 'bottom-start':
        return '';
      case 'top-end':
      case 'bottom-end':
        return 'transform -translate-x-full';
      case 'left':
      case 'right':
        return 'transform -translate-y-1/2';
      default:
        return 'transform -translate-x-1/2';
    }
  };

  // Get arrow classes
  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 bg-gray-900 transform rotate-45';
    
    switch (position) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return `${baseClasses} -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45`;
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return `${baseClasses} -top-1 left-1/2 transform -translate-x-1/2 rotate-45`;
      case 'left':
        return `${baseClasses} -right-1 top-1/2 transform -translate-y-1/2 rotate-45`;
      case 'right':
        return `${baseClasses} -left-1 top-1/2 transform -translate-y-1/2 rotate-45`;
      default:
        return `${baseClasses} -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45`;
    }
  };

  // Animation variants
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: position.includes('top') ? 5 : position.includes('bottom') ? -5 : 0,
      x: position.includes('left') ? 5 : position.includes('right') ? -5 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: position.includes('top') ? 5 : position.includes('bottom') ? -5 : 0,
      x: position.includes('left') ? 5 : position.includes('right') ? -5 : 0,
      transition: {
        duration: 0.1,
        ease: 'easeIn'
      }
    }
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed z-50 pointer-events-none ${getAlignmentClasses()}`}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transformOrigin: getTransformOrigin(),
            maxWidth: maxWidth
          }}
        >
          <div
            className={`
              relative px-2 py-1 text-xs text-white bg-gray-900 rounded-md shadow-lg
              ${contentClassName}
            `}
          >
            {content}
            {arrow && <div className={getArrowClasses()} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
      {createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
