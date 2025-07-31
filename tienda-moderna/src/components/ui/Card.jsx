import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ className, children, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-medium hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Attach subcomponents to Card
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

// Export individual components as well
export { CardHeader, CardContent, CardFooter };

export default Card;
