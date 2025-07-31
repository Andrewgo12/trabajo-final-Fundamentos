import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Heart, 
  Truck, 
  Shield, 
  Leaf,
  Star,
  MapPin,
  Calendar,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
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

const About = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: Users, value: '50,000+', label: 'Clientes Satisfechos' },
    { icon: Award, value: '10+', label: 'Años de Experiencia' },
    { icon: Star, value: '4.8/5', label: 'Calificación Promedio' },
    { icon: Truck, value: '99%', label: 'Entregas a Tiempo' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compromiso con el Cliente',
      description: 'Ponemos a nuestros clientes en el centro de todo lo que hacemos, ofreciendo un servicio excepcional y productos de calidad.'
    },
    {
      icon: Shield,
      title: 'Calidad Garantizada',
      description: 'Trabajamos solo con las mejores marcas y productos que cumplen con los más altos estándares de calidad y seguridad.'
    },
    {
      icon: Leaf,
      title: 'Responsabilidad Ambiental',
      description: 'Promovemos productos eco-amigables y prácticas sostenibles para cuidar nuestro planeta.'
    },
    {
      icon: Truck,
      title: 'Entrega Confiable',
      description: 'Garantizamos entregas rápidas y seguras en toda Colombia, con seguimiento en tiempo real de tus pedidos.'
    }
  ];

  const team = [
    {
      name: 'María González',
      role: 'CEO & Fundadora',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Con más de 15 años de experiencia en retail, María fundó Tienda Moderna con la visión de hacer accesibles productos de limpieza de calidad.'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director de Operaciones',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Carlos lidera nuestras operaciones logísticas, asegurando que cada pedido llegue a tiempo y en perfectas condiciones.'
    },
    {
      name: 'Ana Martínez',
      role: 'Directora de Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Ana se encarga de conectar con nuestros clientes y comunicar los valores de nuestra marca a través de estrategias innovadoras.'
    }
  ];

  const milestones = [
    { year: '2014', event: 'Fundación de Tienda Moderna en Bogotá' },
    { year: '2016', event: 'Expansión a Medellín y Cali' },
    { year: '2018', event: 'Lanzamiento de la tienda online' },
    { year: '2020', event: 'Certificación como empresa B' },
    { year: '2022', event: 'Cobertura nacional en Colombia' },
    { year: '2024', event: 'Más de 50,000 clientes satisfechos' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading size="lg" text="Cargando información de la empresa..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorDisplay
          title="Error al cargar"
          message={error}
          onRetry={() => {
            setError(null);
            setLoading(true);
            setTimeout(() => setLoading(false), 1500);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Acerca de Nosotros' }
          ]} />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Somos una empresa colombiana comprometida con ofrecer productos de limpieza 
              de la más alta calidad, con un servicio excepcional y precios justos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="accent" size="lg" className="btn btn-accent btn-lg">
                  Ver Productos
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card h-full">
                <div className="card-content">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Nuestra Misión
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Facilitar el acceso a productos de limpieza de alta calidad para hogares 
                    y empresas en Colombia, ofreciendo una experiencia de compra excepcional 
                    con entregas rápidas, precios competitivos y un servicio al cliente 
                    personalizado que supere las expectativas.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card h-full">
                <div className="card-content">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-accent-600" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Nuestra Visión
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Ser la tienda online líder en productos de limpieza en Colombia, 
                    reconocida por nuestra innovación, sostenibilidad y compromiso con 
                    la satisfacción del cliente, contribuyendo a hogares más limpios 
                    y saludables en todo el país.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en Tienda Moderna
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="card card-hover h-full text-center">
                  <div className="card-content">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas apasionadas que hacen posible Tienda Moderna
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="card card-hover text-center">
                  <div className="card-content">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un recorrido por los momentos más importantes de nuestro crecimiento
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <Card className="card">
                      <div className="card-content">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary-600" />
                          <span className="font-bold text-primary-600 text-lg">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2">{milestone.event}</p>
                      </div>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-primary-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              ¿Listo para Conocer Nuestros Productos?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Descubre nuestra amplia gama de productos de limpieza de alta calidad 
              y únete a miles de clientes satisfechos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="accent" size="lg" className="btn btn-accent btn-lg">
                  Explorar Productos
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="outline" size="lg" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600">
                  Ver Ofertas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Complete Components Demo Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Interactúa con Nosotros
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre todas las formas de conectar con nuestra empresa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Tabs Demo */}
            <Card className="card">
              <div className="card-content">
                <h3 className="font-semibold mb-4">Explora Nuestras Secciones</h3>
                <Tabs
                  tabs={[
                    { id: 'company', label: 'Empresa', icon: Building },
                    { id: 'team', label: 'Equipo', icon: Users },
                    { id: 'values', label: 'Valores', icon: Award }
                  ]}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  {activeTab === 'company' && (
                    <p className="text-sm text-gray-600">
                      Conoce más sobre nuestra historia y misión empresarial.
                    </p>
                  )}
                  {activeTab === 'team' && (
                    <p className="text-sm text-gray-600">
                      Descubre al equipo profesional detrás de Tienda Moderna.
                    </p>
                  )}
                  {activeTab === 'values' && (
                    <p className="text-sm text-gray-600">
                      Explora los valores que guían nuestro trabajo diario.
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Rating Demo */}
            <Card className="card">
              <div className="card-content">
                <h3 className="font-semibold mb-4">Califica Nuestra Empresa</h3>
                <div className="text-center">
                  <Rating value={4.8} size="lg" showValue />
                  <p className="text-sm text-gray-600 mt-2">4.8 de 5 estrellas</p>
                  <p className="text-xs text-gray-500">Basado en 2,847 reseñas</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">5★</span>
                    <Progress value={85} max={100} className="flex-1" />
                    <span className="text-sm text-gray-500">85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">4★</span>
                    <Progress value={12} max={100} className="flex-1" />
                    <span className="text-sm text-gray-500">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm w-8">3★</span>
                    <Progress value={2} max={100} className="flex-1" />
                    <span className="text-sm text-gray-500">2%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Search Demo */}
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Busca información sobre nuestra empresa..."
              className="max-w-2xl mx-auto"
            />
          </div>

          {/* Accordion FAQ */}
          <Card className="card mb-8">
            <div className="card-content">
              <h3 className="font-semibold mb-4">Preguntas Frecuentes sobre Nosotros</h3>
              <Accordion
                items={[
                  {
                    id: 'history',
                    title: '¿Cuándo fue fundada Tienda Moderna?',
                    content: 'Tienda Moderna fue fundada en 2014 en Bogotá, Colombia, con la visión de revolucionar el mercado de productos de limpieza.'
                  },
                  {
                    id: 'mission',
                    title: '¿Cuál es nuestra misión?',
                    content: 'Nuestra misión es proporcionar productos de limpieza de alta calidad que hagan la vida más fácil y los hogares más saludables.'
                  },
                  {
                    id: 'sustainability',
                    title: '¿Qué hacemos por el medio ambiente?',
                    content: 'Estamos comprometidos con la sostenibilidad, ofreciendo productos eco-amigables y empaques reciclables.'
                  },
                  {
                    id: 'team',
                    title: '¿Cuántas personas trabajan en la empresa?',
                    content: 'Nuestro equipo está compuesto por más de 150 profesionales dedicados en diferentes áreas de la empresa.'
                  }
                ]}
              />
            </div>
          </Card>

          {/* Dropdown and Tooltip Demo */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Dropdown
              trigger={
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nuestras Ubicaciones
                </Button>
              }
              items={[
                { label: 'Bogotá - Sede Principal', value: 'bogota' },
                { label: 'Medellín - Sucursal', value: 'medellin' },
                { label: 'Cali - Sucursal', value: 'cali' },
                { label: 'Barranquilla - Sucursal', value: 'barranquilla' }
              ]}
              onSelect={(item) => console.log('Ubicación seleccionada:', item)}
            />

            <Tooltip content="¡Contáctanos para conocer más sobre nuestra empresa!">
              <Button onClick={() => setShowModal(true)} className="btn btn-primary">
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </Button>
            </Tooltip>
          </div>

          {/* Pagination Demo */}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
              showInfo={true}
              totalItems={47}
              itemsPerPage={10}
            />
          </div>
        </div>
      </section>

      {/* Modal Demo */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Contacta con Tienda Moderna"
      >
        <div className="space-y-4">
          <p>¿Te interesa conocer más sobre nuestra empresa? ¡Estamos aquí para ayudarte!</p>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Teléfono</h4>
                <p className="text-blue-700">+57 300 123 4567</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Email</h4>
                <p className="text-green-700">info@tiendamoderna.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <h4 className="font-semibold text-purple-900">Dirección</h4>
                <p className="text-purple-700">Calle 123 #45-67, Bogotá</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowModal(false)} className="flex-1">
              Llamar Ahora
            </Button>
            <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default About;
