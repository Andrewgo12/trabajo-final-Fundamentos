import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const Accordion = ({
  type = 'single', // 'single' or 'multiple'
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className = '',
  children,
  ...props
}) => {
  const [openItems, setOpenItems] = useState(() => {
    if (controlledValue !== undefined) {
      return type === 'single' ? [controlledValue].filter(Boolean) : controlledValue || [];
    }
    if (defaultValue !== undefined) {
      return type === 'single' ? [defaultValue].filter(Boolean) : defaultValue || [];
    }
    return [];
  });

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : openItems;

  const handleValueChange = (value) => {
    let newValue;

    if (type === 'single') {
      // Single accordion
      if (currentValue.includes(value)) {
        // Item is open, close it if collapsible
        newValue = collapsible ? [] : currentValue;
      } else {
        // Item is closed, open it
        newValue = [value];
      }
    } else {
      // Multiple accordion
      if (currentValue.includes(value)) {
        // Item is open, close it
        newValue = currentValue.filter(item => item !== value);
      } else {
        // Item is closed, open it
        newValue = [...currentValue, value];
      }
    }

    if (!isControlled) {
      setOpenItems(newValue);
    }

    if (onValueChange) {
      onValueChange(type === 'single' ? newValue[0] || null : newValue);
    }
  };

  const accordionContext = {
    openItems: currentValue,
    onValueChange: handleValueChange,
    type,
    collapsible,
  };

  return (
    <div className={`accordion ${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, accordionContext);
        }
        return child;
      })}
    </div>
  );
};

const AccordionItem = ({
  value,
  openItems = [],
  onValueChange,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const isOpen = openItems.includes(value);

  const itemContext = {
    value,
    isOpen,
    onValueChange,
    disabled,
  };

  return (
    <div
      className={`
        accordion-item border-b border-gray-200 last:border-b-0
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, itemContext);
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({
  value,
  isOpen = false,
  onValueChange,
  disabled = false,
  icon = 'chevron', // 'chevron', 'plus', or custom component
  className = '',
  children,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onValueChange) {
      onValueChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const getIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    switch (icon) {
      case 'plus':
        return isOpen ? (
          <Minus className="w-4 h-4 transition-transform duration-200" />
        ) : (
          <Plus className="w-4 h-4 transition-transform duration-200" />
        );
      case 'chevron':
      default:
        return (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        );
    }
  };

  return (
    <button
      className={`
        accordion-trigger w-full flex items-center justify-between
        py-4 px-0 text-left font-medium text-gray-900
        hover:text-primary-600 focus:outline-none focus:text-primary-600
        transition-colors duration-200
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      id={`accordion-trigger-${value}`}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <span className="ml-4 flex-shrink-0 text-gray-400">
        {getIcon()}
      </span>
    </button>
  );
};

const AccordionContent = ({
  value,
  isOpen = false,
  className = '',
  children,
  ...props
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const contentVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: {
          duration: 0.2,
          delay: 0,
        },
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={contentVariants}
          className="accordion-content overflow-hidden"
          id={`accordion-content-${value}`}
          aria-labelledby={`accordion-trigger-${value}`}
        >
          <div
            ref={contentRef}
            className={`pb-4 text-gray-600 ${className}`}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Preset accordion variants
export const FAQAccordion = ({ items = [], ...props }) => {
  return (
    <Accordion type="single" collapsible {...props}>
      {items.map((item, index) => (
        <AccordionItem key={item.id || index} value={item.id || index.toString()}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const FeatureAccordion = ({ features = [], ...props }) => {
  return (
    <Accordion type="multiple" {...props}>
      {features.map((feature, index) => (
        <AccordionItem key={feature.id || index} value={feature.id || index.toString()}>
          <AccordionTrigger icon="plus">
            <div className="flex items-center gap-3">
              {feature.icon && (
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
              )}
              <span>{feature.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-11">
              {feature.description}
              {feature.details && (
                <ul className="mt-3 space-y-1 text-sm">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary-600 rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// Export all components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, FAQAccordion };
export default Accordion;
