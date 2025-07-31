import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Package, 
  Tag, 
  Heart, 
  User, 
  ShoppingBag, 
  Settings, 
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/products';

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useStore();
  const { isAuthenticated, user, logout } = useAuth();

  const mainMenuItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Package, label: 'Productos', path: '/products' },
    { icon: Tag, label: 'Ofertas', path: '/offers' },
  ];

  const userMenuItems = [
    { icon: User, label: 'Mi Perfil', path: '/profile' },
    { icon: ShoppingBag, label: 'Mis Pedidos', path: '/orders' },
    { icon: Heart, label: 'Lista de Deseos', path: '/wishlist' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  const helpMenuItems = [
    { icon: HelpCircle, label: 'Centro de Ayuda', path: '/help' },
    { icon: Phone, label: 'Contacto', path: '/contact' },
    { icon: Mail, label: 'Soporte', path: '/support' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  const MenuItem = ({ icon: Icon, label, path, onClick, className = "" }) => (
    <motion.div variants={itemVariants}>
      <Link
        to={path}
        onClick={() => {
          closeSidebar();
          onClick && onClick();
        }}
        className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors group ${className}`}
      >
        <Icon className="w-5 h-5 mr-3 group-hover:text-primary-600" />
        <span className="font-medium">{label}</span>
        <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">TM</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-gray-900">
                      Tienda Moderna
                    </h2>
                    <p className="text-xs text-gray-500">Productos de limpieza</p>
                  </div>
                </div>
                <button
                  onClick={closeSidebar}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && user && (
                <motion.div 
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-lg">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex-1 py-6">
                <motion.div
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {/* Main Menu */}
                  <div className="mb-8">
                    <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Menú Principal
                    </h3>
                    <div className="space-y-1">
                      {mainMenuItems.map((item) => (
                        <MenuItem
                          key={item.path}
                          icon={item.icon}
                          label={item.label}
                          path={item.path}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Categorías
                    </h3>
                    <div className="space-y-1">
                      {categories.slice(0, 6).map((category) => (
                        <motion.div key={category.id} variants={itemVariants}>
                          <Link
                            to={`/category/${category.id}`}
                            onClick={closeSidebar}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors group"
                          >
                            <span className="text-lg mr-3">{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* User Menu (if authenticated) */}
                  {isAuthenticated && (
                    <div className="mb-8">
                      <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Mi Cuenta
                      </h3>
                      <div className="space-y-1">
                        {userMenuItems.map((item) => (
                          <MenuItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Help Menu */}
                  <div className="mb-8">
                    <h3 className="px-4 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Ayuda y Soporte
                    </h3>
                    <div className="space-y-1">
                      {helpMenuItems.map((item) => (
                        <MenuItem
                          key={item.path}
                          icon={item.icon}
                          label={item.label}
                          path={item.path}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                {isAuthenticated ? (
                  <motion.button
                    variants={itemVariants}
                    onClick={() => {
                      logout();
                      closeSidebar();
                    }}
                    className="w-full flex items-center justify-center px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
                  >
                    Cerrar Sesión
                  </motion.button>
                ) : (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Link
                      to="/login"
                      onClick={closeSidebar}
                      className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors font-medium"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeSidebar}
                      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    >
                      Registrarse
                    </Link>
                  </motion.div>
                )}

                {/* Contact Info */}
                <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>+57 300 123 4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>info@tiendamoderna.com</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Bogotá, Colombia</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
