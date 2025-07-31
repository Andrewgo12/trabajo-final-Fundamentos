import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Package, 
  CreditCard, 
  Truck, 
  RotateCcw,
  Shield,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import Accordion from '../components/ui/Accordion';
import Badge from '../components/ui/Badge';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Rating from '../components/ui/Rating';
import Progress from '../components/ui/Progress';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Dropdown from '../components/ui/Dropdown';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = [
    { id: 'all', name: 'Todas', icon: HelpCircle },
    { id: 'orders', name: 'Pedidos', icon: Package },
    { id: 'payments', name: 'Pagos', icon: CreditCard },
    { id: 'shipping', name: 'Envíos', icon: Truck },
    { id: 'returns', name: 'Devoluciones', icon: RotateCcw },
    { id: 'account', name: 'Cuenta', icon: Shield },
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: '¿Cómo puedo realizar un pedido?',
      answer: 'Para realizar un pedido, simplemente navega por nuestros productos, agrega los que desees al carrito y sigue el proceso de checkout. Necesitarás crear una cuenta o iniciar sesión para completar tu compra.'
    },
    {
      id: 2,
      category: 'orders',
      question: '¿Puedo modificar o cancelar mi pedido?',
      answer: 'Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de haberlo realizado, siempre que no haya sido procesado aún. Contacta nuestro servicio al cliente para hacer cambios.'
    },
    {
      id: 3,
      category: 'payments',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, y pago contra entrega en efectivo. Todos los pagos son procesados de forma segura.'
    },
    {
      id: 4,
      category: 'payments',
      question: '¿Es seguro pagar en línea?',
      answer: 'Sí, utilizamos encriptación SSL de 256 bits para proteger toda la información de pago. Nunca almacenamos los datos de tu tarjeta en nuestros servidores.'
    },
    {
      id: 5,
      category: 'shipping',
      question: '¿Cuánto tiempo tarda el envío?',
      answer: 'Los envíos dentro de Bogotá tardan 1-2 días hábiles. Para otras ciudades principales, 2-3 días hábiles. Ciudades intermedias pueden tardar 3-5 días hábiles.'
    },
    {
      id: 6,
      category: 'shipping',
      question: '¿Cuánto cuesta el envío?',
      answer: 'El envío es gratuito para compras superiores a $50.000. Para compras menores, el costo de envío es de $8.000 dentro de Bogotá y varía según la ciudad de destino.'
    },
    {
      id: 7,
      category: 'returns',
      question: '¿Puedo devolver un producto?',
      answer: 'Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su empaque original y en perfectas condiciones.'
    },
    {
      id: 8,
      category: 'returns',
      question: '¿Cómo proceso una devolución?',
      answer: 'Puedes iniciar una devolución desde tu cuenta en la sección "Mis Pedidos". También puedes contactar nuestro servicio al cliente para asistencia.'
    },
    {
      id: 9,
      category: 'account',
      question: '¿Cómo creo una cuenta?',
      answer: 'Haz clic en "Registrarse" en la parte superior de la página y completa el formulario con tu información. También puedes crear una cuenta durante el proceso de checkout.'
    },
    {
      id: 10,
      category: 'account',
      question: '¿Olvidé mi contraseña, qué hago?',
      answer: 'Haz clic en "¿Olvidaste tu contraseña?" en la página de inicio de sesión. Te enviaremos un enlace a tu correo electrónico para restablecer tu contraseña.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Chat en Vivo',
      description: 'Chatea con nuestro equipo',
      action: 'Iniciar Chat',
      available: true
    },
    {
      icon: Phone,
      title: 'Llamar',
      description: '+57 300 123 4567',
      action: 'Llamar Ahora',
      available: true
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'info@tiendamoderna.com',
      action: 'Enviar Email',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Ayuda' }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Centro de Ayuda
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Encuentra respuestas a las preguntas más frecuentes o contacta nuestro equipo de soporte.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5 text-gray-400" />}
                className="input bg-white"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card sticky top-24">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Categorías</h2>
              </div>
              <div className="card-content">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Preguntas Frecuentes
              </h2>
              
              {filteredFAQs.length === 0 ? (
                <Card className="card">
                  <div className="card-content text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No se encontraron preguntas
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      variant="outline"
                      className="btn btn-outline"
                    >
                      Ver Todas las Preguntas
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="card">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full text-left"
                        >
                          <div className="card-content">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              {expandedFAQ === faq.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedFAQ === faq.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-6 pb-6">
                                <div className="border-t border-gray-200 pt-4">
                                  <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                ¿Necesitas Más Ayuda?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="card card-hover h-full">
                      <div className="card-content text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <option.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {option.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="btn btn-outline"
                          disabled={!option.available}
                        >
                          {option.action}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  ¿No encontraste lo que buscabas?
                </p>
                <Link to="/contact">
                  <Button className="btn btn-primary">
                    Contactar Soporte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
