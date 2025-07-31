import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import Progress from '../components/ui/Progress';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Dropdown from '../components/ui/Dropdown';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'El asunto es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', data);
    reset();
    // Show success message
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Teléfono',
      description: 'Llámanos de lunes a viernes',
      value: '+57 300 123 4567',
      action: 'tel:+573001234567',
      available: '9:00 AM - 6:00 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envíanos un correo electrónico',
      value: 'info@tiendamoderna.com',
      action: 'mailto:info@tiendamoderna.com',
      available: 'Respuesta en 24 horas'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chatea con nosotros',
      value: '+57 300 123 4567',
      action: 'https://wa.me/573001234567',
      available: '9:00 AM - 8:00 PM'
    },
    {
      icon: Headphones,
      title: 'Soporte Técnico',
      description: 'Ayuda especializada',
      value: 'soporte@tiendamoderna.com',
      action: 'mailto:soporte@tiendamoderna.com',
      available: 'Lun - Vie: 8:00 AM - 5:00 PM'
    }
  ];

  const offices = [
    {
      name: 'Oficina Principal',
      address: 'Calle 123 #45-67, Chapinero',
      city: 'Bogotá, Colombia',
      phone: '+57 1 234 5678',
      hours: 'Lun - Vie: 8:00 AM - 6:00 PM'
    },
    {
      name: 'Centro de Distribución',
      address: 'Carrera 45 #78-90, Zona Industrial',
      city: 'Medellín, Colombia',
      phone: '+57 4 234 5678',
      hours: 'Lun - Sáb: 7:00 AM - 5:00 PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Contacto' }
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
              Contáctanos
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de nuestros canales de comunicación.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card">
              <div className="card-header">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  Envíanos un Mensaje
                </h2>
                <p className="text-gray-600">
                  Completa el formulario y te responderemos lo antes posible.
                </p>
              </div>
              <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...register('name')}
                      label="Nombre Completo"
                      placeholder="Tu nombre"
                      error={errors.name?.message}
                      className="input"
                    />
                    <Input
                      {...register('email')}
                      type="email"
                      label="Correo Electrónico"
                      placeholder="tu@email.com"
                      error={errors.email?.message}
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...register('phone')}
                      type="tel"
                      label="Teléfono (Opcional)"
                      placeholder="+57 300 123 4567"
                      error={errors.phone?.message}
                      className="input"
                    />
                    <Input
                      {...register('subject')}
                      label="Asunto"
                      placeholder="¿En qué podemos ayudarte?"
                      error={errors.subject?.message}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      placeholder="Describe tu consulta o comentario..."
                      className="input resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-error-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Otros Canales de Contacto
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="block"
                  >
                    <Card className="card card-hover h-full">
                      <div className="card-content text-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <method.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {method.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {method.description}
                        </p>
                        <p className="font-medium text-primary-600 mb-1">
                          {method.value}
                        </p>
                        <p className="text-xs text-gray-500">
                          {method.available}
                        </p>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Nuestras Oficinas
              </h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="card">
                      <div className="card-content">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-accent-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {office.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-1">
                              {office.address}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              {office.city}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{office.phone}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">{office.hours}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="card-content text-center">
                  <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    ¿Tienes una pregunta frecuente?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Revisa nuestra sección de preguntas frecuentes para encontrar respuestas rápidas.
                  </p>
                  <Button variant="outline" className="btn btn-outline">
                    Ver Preguntas Frecuentes
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
