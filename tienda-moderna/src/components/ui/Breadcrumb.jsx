import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Breadcrumb = ({ 
  items = [], 
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  className = '',
  ...props 
}) => {
  const breadcrumbItems = showHome 
    ? [{ label: 'Inicio', href: '/', icon: Home }, ...items]
    : items;

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const IconComponent = item.icon;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-gray-400 mx-2" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {isLast ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-gray-900 font-medium"
                  aria-current="page"
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                  {item.label}
                </motion.span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Preset breadcrumb for products
export const ProductBreadcrumb = ({ category, product }) => {
  const items = [];
  
  if (category) {
    items.push({
      label: 'Productos',
      href: '/products'
    });
    
    items.push({
      label: category.name,
      href: `/category/${category.id}`
    });
  }
  
  if (product) {
    items.push({
      label: product.name
    });
  }
  
  return <Breadcrumb items={items} />;
};

// Preset breadcrumb for categories
export const CategoryBreadcrumb = ({ category, subcategory }) => {
  const items = [
    {
      label: 'Categorías',
      href: '/categories'
    }
  ];
  
  if (category) {
    items.push({
      label: category.name,
      href: `/category/${category.id}`
    });
  }
  
  if (subcategory) {
    items.push({
      label: subcategory.name
    });
  }
  
  return <Breadcrumb items={items} />;
};

// Preset breadcrumb for user pages
export const UserBreadcrumb = ({ page }) => {
  const items = [
    {
      label: 'Mi Cuenta',
      href: '/profile'
    }
  ];
  
  if (page) {
    items.push({
      label: page
    });
  }
  
  return <Breadcrumb items={items} />;
};

export default Breadcrumb;
