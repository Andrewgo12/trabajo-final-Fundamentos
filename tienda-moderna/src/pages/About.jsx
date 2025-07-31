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

const About = () => {
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
    </div>
  );
};

export default About;
