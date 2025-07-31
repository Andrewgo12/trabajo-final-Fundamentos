import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

const Dropdown = ({
  trigger,
  children,
  position = 'bottom-start',
  offset = 4,
  className = '',
  contentClassName = '',
  disabled = false,
  closeOnClick = true,
  closeOnClickOutside = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  // Calculate position
  const calculatePosition = () => {
    if (!triggerRef.current) return { x: 0, y: 0 };

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let x = 0;
    let y = 0;

    switch (position) {
      case 'bottom-start':
        x = triggerRect.left + scrollX;
        y = triggerRect.bottom + scrollY + offset;
        break;
      case 'bottom-end':
        x = triggerRect.right + scrollX;
        y = triggerRect.bottom + scrollY + offset;
        break;
      case 'bottom':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.bottom + scrollY + offset;
        break;
      case 'top-start':
        x = triggerRect.left + scrollX;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'top-end':
        x = triggerRect.right + scrollX;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'top':
        x = triggerRect.left + scrollX + triggerRect.width / 2;
        y = triggerRect.top + scrollY - offset;
        break;
      case 'left':
        x = triggerRect.left + scrollX - offset;
        y = triggerRect.top + scrollY;
        break;
      case 'right':
        x = triggerRect.right + scrollX + offset;
        y = triggerRect.top + scrollY;
        break;
      default:
        x = triggerRect.left + scrollX;
        y = triggerRect.bottom + scrollY + offset;
    }

    return { x, y };
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (disabled) return;
    
    if (!isOpen) {
      setDropdownPosition(calculatePosition());
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target) &&
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      setDropdownPosition(calculatePosition());
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, position, offset]);

  // Get alignment classes
  const getAlignmentClasses = () => {
    switch (position) {
      case 'bottom':
      case 'top':
        return 'transform -translate-x-1/2';
      case 'bottom-end':
      case 'top-end':
        return 'transform -translate-x-full';
      case 'left':
        return 'transform -translate-x-full';
      default:
        return '';
    }
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: position.includes('top') ? 10 : -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: position.includes('top') ? 10 : -10,
      transition: {
        duration: 0.1,
        ease: 'easeIn'
      }
    }
  };

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed z-50 ${getAlignmentClasses()}`}
          style={{
            left: dropdownPosition.x,
            top: dropdownPosition.y,
          }}
        >
          <div
            className={`
              bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]
              ${contentClassName}
            `}
            onClick={closeOnClick ? closeDropdown : undefined}
          >
            {children}
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
        onClick={toggleDropdown}
        {...props}
      >
        {trigger}
      </div>
      {createPortal(dropdownContent, document.body)}
    </>
  );
};

// Dropdown Item Component
export const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  selected = false,
  className = '',
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`
        w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
        focus:bg-gray-100 focus:outline-none transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${selected ? 'bg-primary-50 text-primary-700' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {selected && <Check className="w-4 h-4 text-primary-600" />}
      </div>
    </button>
  );
};

// Dropdown Divider Component
export const DropdownDivider = ({ className = '' }) => (
  <div className={`border-t border-gray-200 my-1 ${className}`} />
);

// Dropdown Header Component
export const DropdownHeader = ({ children, className = '' }) => (
  <div className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`}>
    {children}
  </div>
);

// Select Dropdown Component (for form usage)
export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Seleccionar...',
  disabled = false,
  className = '',
  error = false,
  ...props
}) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <Dropdown
      trigger={
        <button
          className={`
            w-full flex items-center justify-between px-3 py-2 text-left
            border rounded-lg bg-white transition-colors
            ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-400'}
            ${className}
          `}
          disabled={disabled}
          {...props}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      }
      disabled={disabled}
      closeOnClick={true}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          onClick={() => onChange && onChange(option.value)}
          selected={option.value === value}
          disabled={option.disabled}
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

// Export all components
export { DropdownItem, DropdownDivider, DropdownHeader, Select };
export default Dropdown;
