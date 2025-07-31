import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(controlledValue || defaultValue || '');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef(null);
  const isControlled = controlledValue !== undefined;

  const currentValue = isControlled ? controlledValue : activeTab;

  // Update indicator position
  const updateIndicator = () => {
    if (!tabsRef.current) return;

    const activeTabElement = tabsRef.current.querySelector(`[data-tab="${currentValue}"]`);
    if (!activeTabElement) return;

    const tabsRect = tabsRef.current.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();

    if (orientation === 'horizontal') {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        width: activeRect.width,
        height: '2px',
        top: 'auto',
        bottom: 0,
      });
    } else {
      setIndicatorStyle({
        top: activeRect.top - tabsRect.top,
        height: activeRect.height,
        width: '2px',
        left: 0,
        right: 'auto',
      });
    }
  };

  // Handle tab change
  const handleTabChange = (value) => {
    if (!isControlled) {
      setActiveTab(value);
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  // Update indicator when active tab changes
  useEffect(() => {
    updateIndicator();
  }, [currentValue, orientation]);

  // Update indicator on resize
  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Size variants
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  // Variant classes
  const getVariantClasses = (isActive) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
      case 'enclosed':
        return isActive
          ? 'bg-white border-gray-300 border-b-white text-gray-900'
          : 'text-gray-600 hover:text-gray-900 border-transparent';
      case 'soft-rounded':
        return isActive
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
      default:
        return isActive
          ? 'text-primary-600 border-primary-600'
          : 'text-gray-600 hover:text-gray-900 border-transparent';
    }
  };

  const tabsContext = {
    currentValue,
    onValueChange: handleTabChange,
    orientation,
    variant,
    size,
  };

  return (
    <div className={`tabs ${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...tabsContext });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({
  currentValue,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const tabsRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Update indicator position
  const updateIndicator = () => {
    if (!tabsRef.current) return;

    const activeTabElement = tabsRef.current.querySelector(`[data-tab="${currentValue}"]`);
    if (!activeTabElement) return;

    const tabsRect = tabsRef.current.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();

    if (orientation === 'horizontal') {
      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        width: activeRect.width,
        height: '2px',
        top: 'auto',
        bottom: 0,
      });
    } else {
      setIndicatorStyle({
        top: activeRect.top - tabsRect.top,
        height: activeRect.height,
        width: '2px',
        left: 0,
        right: 'auto',
      });
    }
  };

  useEffect(() => {
    updateIndicator();
  }, [currentValue, orientation]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerClasses = {
    horizontal: 'flex border-b border-gray-200',
    vertical: 'flex flex-col border-r border-gray-200',
  };

  const getContainerVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'bg-gray-100 p-1 rounded-lg';
      case 'enclosed':
        return 'border-b border-gray-300';
      case 'soft-rounded':
        return 'bg-gray-50 p-1 rounded-lg';
      default:
        return 'border-b border-gray-200';
    }
  };

  return (
    <div
      ref={tabsRef}
      className={`
        relative
        ${containerClasses[orientation]}
        ${getContainerVariantClasses()}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            currentValue,
            onValueChange,
            orientation,
            variant,
            size,
          });
        }
        return child;
      })}
      
      {/* Indicator */}
      {variant === 'default' && (
        <motion.div
          className="absolute bg-primary-600 rounded-full"
          style={indicatorStyle}
          initial={false}
          animate={indicatorStyle}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};

const TabsTrigger = ({
  value,
  currentValue,
  onValueChange,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const isActive = currentValue === value;

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-primary-600 text-white shadow-sm'
          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50';
      case 'enclosed':
        return isActive
          ? 'bg-white border border-gray-300 border-b-white text-gray-900 -mb-px'
          : 'text-gray-600 hover:text-gray-900 border border-transparent hover:border-gray-300';
      case 'soft-rounded':
        return isActive
          ? 'bg-white text-primary-700 shadow-sm'
          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50';
      default:
        return isActive
          ? 'text-primary-600'
          : 'text-gray-600 hover:text-gray-900';
    }
  };

  const baseClasses = `
    relative font-medium transition-all duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variant === 'pills' || variant === 'soft-rounded' ? 'rounded-md' : ''}
    ${variant === 'enclosed' ? 'rounded-t-md' : ''}
  `;

  return (
    <button
      data-tab={value}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getVariantClasses()}
        ${className}
      `}
      onClick={() => !disabled && onValueChange && onValueChange(value)}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({
  value,
  currentValue,
  className = '',
  children,
  ...props
}) => {
  const isActive = currentValue === value;

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        ease: 'easeIn',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`focus:outline-none ${className}`}
          role="tabpanel"
          aria-labelledby={`tab-${value}`}
          id={`panel-${value}`}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Export all components
export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
