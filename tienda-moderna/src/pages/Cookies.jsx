import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cookie, 
  Shield, 
  Settings, 
  Eye, 
  BarChart3, 
  Target, 
  ArrowLeft,
  Info,
  CheckCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Download,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';

const Cookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: true,
    analytics: true,
    marketing: false,
    personalization: true
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookiePreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const cookieCategories = [
    {
      id: 'essential',
      name: 'Cookies Esenciales',
      description: 'Necesarias para el funcionamiento básico del sitio web',
      icon: Shield,
      color: 'success',
      required: true,
      details: [
        'Autenticación de usuario',
        'Seguridad del sitio web',
        'Carrito de compras',
        'Preferencias de idioma',
        'Sesión de navegación'
      ]
    },
    {
      id: 'functional',
      name: 'Cookies Funcionales',
      description: 'Mejoran la funcionalidad y personalización del sitio',
      icon: Settings,
      color: 'primary',
      required: false,
      details: [
        'Recordar preferencias de usuario',
        'Configuración de interfaz',
        'Formularios autocompletados',
        'Historial de navegación',
        'Configuración de accesibilidad'
      ]
    },
    {
      id: 'analytics',
      name: 'Cookies de Análisis',
      description: 'Nos ayudan a entender cómo los usuarios interactúan con el sitio',
      icon: BarChart3,
      color: 'info',
      required: false,
      details: [
        'Google Analytics',
        'Estadísticas de uso',
        'Rendimiento del sitio',
        'Análisis de comportamiento',
        'Métricas de conversión'
      ]
    },
    {
      id: 'marketing',
      name: 'Cookies de Marketing',
      description: 'Utilizadas para mostrar anuncios relevantes y medir campañas',
      icon: Target,
      color: 'warning',
      required: false,
      details: [
        'Publicidad personalizada',
        'Seguimiento de conversiones',
        'Remarketing',
        'Redes sociales',
        'Análisis de campañas'
      ]
    },
    {
      id: 'personalization',
      name: 'Cookies de Personalización',
      description: 'Personalizan el contenido y las recomendaciones',
      icon: Eye,
      color: 'accent',
      required: false,
      details: [
        'Recomendaciones de productos',
        'Contenido personalizado',
        'Historial de compras',
        'Productos vistos recientemente',
        'Ofertas personalizadas'
      ]
    }
  ];

  const handlePreferenceChange = (categoryId, value) => {
    if (categoryId === 'essential') return; // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [categoryId]: value
    }));
    setHasChanges(true);
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setHasChanges(false);
    
    // Here you would typically also update your analytics/marketing scripts
    console.log('Cookie preferences saved:', cookiePreferences);
  };

  const resetPreferences = () => {
    const defaultPreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
      personalization: true
    };
    setCookiePreferences(defaultPreferences);
    setHasChanges(true);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setHasChanges(false);
  };

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setCookiePreferences(onlyEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
    setHasChanges(false);
  };

  const exportPreferences = () => {
    const dataToExport = {
      preferences: cookiePreferences,
      exportDate: new Date().toISOString(),
      domain: window.location.hostname
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookie-preferences-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllCookies = () => {
    // Clear all cookies except essential ones
    if (confirm('¿Estás seguro de que quieres eliminar todas las cookies no esenciales? Esto puede afectar tu experiencia en el sitio.')) {
      // This would typically involve more complex cookie clearing logic
      localStorage.removeItem('cookiePreferences');
      sessionStorage.clear();
      
      // Reset to only essential cookies
      const onlyEssential = {
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
        personalization: false
      };
      setCookiePreferences(onlyEssential);
      localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
      setHasChanges(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-primary-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">
                Política de Cookies
              </h1>
              <p className="text-xl text-primary-100">
                Gestiona tus preferencias de cookies y privacidad
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    ¿Qué son las Cookies?
                  </h2>
                  <p className="text-gray-600">
                    Información sobre cómo utilizamos las cookies
                  </p>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
                  visitas nuestro sitio web. Nos ayudan a mejorar tu experiencia de navegación, 
                  recordar tus preferencias y proporcionar funcionalidades personalizadas.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Utilizamos diferentes tipos de cookies para diversos propósitos. Puedes controlar 
                  qué cookies aceptas utilizando las opciones de configuración a continuación.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cookie Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Configuración de Cookies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personaliza qué tipos de cookies quieres permitir en tu navegador
            </p>
          </div>

          <div className="space-y-6">
            {cookieCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card">
                  <div className="card-content">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          category.color === 'success' ? 'bg-success-100' :
                          category.color === 'primary' ? 'bg-primary-100' :
                          category.color === 'info' ? 'bg-info-100' :
                          category.color === 'warning' ? 'bg-warning-100' :
                          'bg-accent-100'
                        }`}>
                          <category.icon className={`w-6 h-6 ${
                            category.color === 'success' ? 'text-success-600' :
                            category.color === 'primary' ? 'text-primary-600' :
                            category.color === 'info' ? 'text-info-600' :
                            category.color === 'warning' ? 'text-warning-600' :
                            'text-accent-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {category.name}
                            </h3>
                            {category.required && (
                              <Badge variant="success" className="badge badge-success text-xs">
                                Requeridas
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{category.description}</p>
                          <details className="text-sm">
                            <summary className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium">
                              Ver detalles
                            </summary>
                            <ul className="mt-2 space-y-1 text-gray-600 ml-4">
                              {category.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </details>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cookiePreferences[category.id]}
                            onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                            disabled={category.required}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 ${
                            category.required ? 'opacity-50 cursor-not-allowed' : ''
                          }`}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h3>
              <p className="text-gray-600">Gestiona todas tus preferencias de una vez</p>
            </div>
            <div className="card-content">
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={acceptAll}
                  className="btn btn-success"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aceptar Todas
                </Button>
                <Button 
                  onClick={rejectAll}
                  variant="outline"
                  className="btn btn-outline"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Solo Esenciales
                </Button>
                <Button 
                  onClick={resetPreferences}
                  variant="ghost"
                  className="btn btn-ghost"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restaurar Predeterminadas
                </Button>
                <Button 
                  onClick={exportPreferences}
                  variant="outline"
                  className="btn btn-outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Preferencias
                </Button>
                <Button 
                  onClick={clearAllCookies}
                  variant="outline"
                  className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpiar Cookies
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Save Changes */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="card shadow-lg border-primary-200">
              <div className="card-content">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900">Cambios sin guardar</p>
                    <p className="text-sm text-gray-600">Guarda tus preferencias de cookies</p>
                  </div>
                  <Button 
                    onClick={savePreferences}
                    className="btn btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">Información Adicional</h3>
              </div>
            </div>
            <div className="card-content">
              <div className="prose prose-gray max-w-none">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Gestión de Cookies en tu Navegador</h4>
                <p className="text-gray-700 mb-4">
                  También puedes gestionar las cookies directamente desde la configuración de tu navegador. 
                  Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Cookies de Terceros</h4>
                <p className="text-gray-700 mb-4">
                  Algunos de nuestros socios (como Google Analytics, redes sociales) pueden establecer 
                  sus propias cookies. Estas cookies están sujetas a las políticas de privacidad de 
                  dichos terceros.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Actualizaciones de la Política</h4>
                <p className="text-gray-700 mb-4">
                  Podemos actualizar esta política de cookies ocasionalmente. Te notificaremos sobre 
                  cambios significativos y te pediremos que revises tus preferencias si es necesario.
                </p>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-primary-900 mb-1">¿Necesitas Ayuda?</h5>
                      <p className="text-primary-800 text-sm mb-3">
                        Si tienes preguntas sobre nuestras cookies o cómo gestionar tus preferencias, 
                        no dudes en contactarnos.
                      </p>
                      <div className="flex gap-3">
                        <Link to="/contact">
                          <Button size="sm" className="btn btn-primary btn-sm">
                            Contactar Soporte
                          </Button>
                        </Link>
                        <Link to="/privacy">
                          <Button variant="outline" size="sm" className="btn btn-outline btn-sm">
                            Política de Privacidad
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
