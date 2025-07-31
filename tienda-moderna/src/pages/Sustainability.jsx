import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Recycle, 
  Droplets, 
  Wind, 
  Heart, 
  ArrowLeft,
  CheckCircle,
  Target,
  Award,
  TreePine,
  Sun,
  Shield,
  Globe,
  Factory,
  Package,
  Truck,
  Calculator,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Sustainability = () => {
  const sustainabilityStats = [
    {
      icon: Recycle,
      value: '85%',
      label: 'Productos Biodegradables',
      description: 'De nuestro catálogo son completamente biodegradables'
    },
    {
      icon: Droplets,
      value: '60%',
      label: 'Reducción de Agua',
      description: 'Menos agua necesaria comparado con productos tradicionales'
    },
    {
      icon: Package,
      value: '100%',
      label: 'Empaques Reciclables',
      description: 'Todos nuestros empaques son reciclables o compostables'
    },
    {
      icon: TreePine,
      value: '500+',
      label: 'Árboles Plantados',
      description: 'Por cada 100 pedidos plantamos un árbol'
    }
  ];

  const ecoProducts = [
    {
      name: 'Línea Eco-Clean',
      description: 'Productos de limpieza 100% naturales y biodegradables',
      features: ['Sin químicos tóxicos', 'Envases reutilizables', 'Fórmulas concentradas'],
      icon: Leaf,
      color: 'success'
    },
    {
      name: 'Serie Océano Limpio',
      description: 'Productos que ayudan a reducir la contaminación del agua',
      features: ['Fórmulas marinas seguras', 'Sin microplásticos', 'Certificación oceánica'],
      icon: Droplets,
      color: 'info'
    },
    {
      name: 'Colección Aire Puro',
      description: 'Limpiadores que mejoran la calidad del aire interior',
      features: ['Sin VOCs', 'Aromas naturales', 'Purificadores de ambiente'],
      icon: Wind,
      color: 'primary'
    },
    {
      name: 'Gama Cero Residuos',
      description: 'Productos diseñados para minimizar los desechos',
      features: ['Envases retornables', 'Tabletas concentradas', 'Refills disponibles'],
      icon: Recycle,
      color: 'accent'
    }
  ];

  const initiatives = [
    {
      title: 'Programa de Recolección',
      description: 'Recogemos envases vacíos para reciclarlos correctamente',
      icon: Recycle,
      status: 'Activo',
      impact: '2,500 envases reciclados mensualmente'
    },
    {
      title: 'Energía Renovable',
      description: 'Nuestras instalaciones funcionan 100% con energía solar',
      icon: Sun,
      status: 'Implementado',
      impact: '40% reducción en huella de carbono'
    },
    {
      title: 'Transporte Verde',
      description: 'Flota de vehículos eléctricos para entregas urbanas',
      icon: Truck,
      status: 'En expansión',
      impact: '25% de entregas con vehículos eléctricos'
    },
    {
      title: 'Laboratorio Sostenible',
      description: 'Investigación y desarrollo de fórmulas eco-amigables',
      icon: Factory,
      status: 'Permanente',
      impact: '15 nuevas fórmulas verdes por año'
    }
  ];

  const certifications = [
    {
      name: 'EcoCert',
      description: 'Certificación de productos orgánicos y naturales',
      logo: '🌿'
    },
    {
      name: 'Cradle to Cradle',
      description: 'Diseño circular y sostenible',
      logo: '♻️'
    },
    {
      name: 'USDA Organic',
      description: 'Ingredientes orgánicos certificados',
      logo: '🌱'
    },
    {
      name: 'Green Seal',
      description: 'Estándares ambientales rigurosos',
      logo: '🏆'
    },
    {
      name: 'EPA Safer Choice',
      description: 'Productos más seguros para la salud',
      logo: '✅'
    },
    {
      name: 'Forest Stewardship Council',
      description: 'Empaques de bosques responsables',
      logo: '🌲'
    }
  ];

  const tips = [
    {
      title: 'Usa la Cantidad Correcta',
      description: 'Más producto no significa mejor limpieza. Sigue las instrucciones para un uso eficiente.',
      icon: Droplets
    },
    {
      title: 'Reutiliza los Envases',
      description: 'Muchos de nuestros envases pueden reutilizarse para almacenamiento o manualidades.',
      icon: Recycle
    },
    {
      title: 'Combina Productos',
      description: 'Algunos productos pueden usarse para múltiples superficies, reduciendo la cantidad necesaria.',
      icon: Target
    },
    {
      title: 'Recicla Correctamente',
      description: 'Separa los materiales según las normas locales de reciclaje para maximizar su reutilización.',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-success-600 to-primary-600 text-white">
        <div className="container-custom py-20">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-success-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-4">
                Compromiso Sostenible
              </h1>
              <p className="text-xl text-success-100 max-w-3xl">
                Cuidamos tu hogar y nuestro planeta con productos de limpieza eco-amigables 
                y prácticas responsables que protegen el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card card-hover text-center h-full">
                  <div className="card-content">
                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-success-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Eco Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Líneas de Productos Sostenibles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestras colecciones diseñadas especialmente para cuidar el medio ambiente 
              sin comprometer la eficacia de limpieza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecoProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card card-hover h-full">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        product.color === 'success' ? 'bg-success-100' :
                        product.color === 'info' ? 'bg-info-100' :
                        product.color === 'primary' ? 'bg-primary-100' :
                        'bg-accent-100'
                      }`}>
                        <product.icon className={`w-6 h-6 ${
                          product.color === 'success' ? 'text-success-600' :
                          product.color === 'info' ? 'text-info-600' :
                          product.color === 'primary' ? 'text-primary-600' :
                          'text-accent-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <ul className="space-y-2">
                          {product.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Nuestras Iniciativas Verdes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Implementamos programas concretos para reducir nuestro impacto ambiental 
              y promover prácticas sostenibles en toda nuestra cadena de valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card card-hover h-full">
                  <div className="card-content">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <initiative.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {initiative.title}
                          </h3>
                          <Badge 
                            variant={initiative.status === 'Activo' ? 'success' : 
                                   initiative.status === 'Implementado' ? 'primary' : 'warning'} 
                            className={`badge ${
                              initiative.status === 'Activo' ? 'badge-success' : 
                              initiative.status === 'Implementado' ? 'badge-primary' : 'badge-warning'
                            } text-xs`}
                          >
                            {initiative.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{initiative.description}</p>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-900 mb-1">Impacto:</p>
                          <p className="text-sm text-gray-700">{initiative.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Certificaciones y Reconocimientos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestro compromiso con la sostenibilidad está respaldado por certificaciones 
              internacionales que garantizan la calidad y responsabilidad ambiental.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <Card className="card card-hover text-center h-full">
                  <div className="card-content">
                    <div className="text-4xl mb-3">{cert.logo}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-gray-600">{cert.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-success-600" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Tips para un Hogar Más Sostenible
                  </h2>
                  <p className="text-gray-600">
                    Pequeñas acciones que hacen una gran diferencia
                  </p>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-5 h-5 text-success-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <Card className="card bg-gradient-to-r from-success-50 to-primary-50 border-success-200">
            <div className="card-content">
              <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-success-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Únete a Nuestro Compromiso Verde
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Cada compra que realizas contribuye a un futuro más sostenible. 
                Descubre nuestros productos eco-amigables y forma parte del cambio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products?category=eco">
                  <Button className="btn btn-success">
                    <Leaf className="w-4 h-4 mr-2" />
                    Ver Productos Eco
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="btn btn-outline">
                    <Globe className="w-4 h-4 mr-2" />
                    Conoce Más
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Carbon Footprint Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16 border-t border-gray-200 pt-16"
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Calculadora de Huella de Carbono
                  </h2>
                  <p className="text-gray-600">
                    Descubre cuánto CO₂ ahorras usando productos eco-amigables
                  </p>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Calcula tu impacto
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Productos de limpieza usados por mes
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ej: 5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tamaño del hogar (personas)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Ej: 4"
                      />
                    </div>
                    <Button className="btn btn-primary w-full">
                      Calcular Impacto
                    </Button>
                  </div>
                </div>
                <div className="bg-success-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-success-800 mb-4">
                    Tu Impacto Ambiental
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-success-700">CO₂ ahorrado anualmente:</span>
                      <span className="font-bold text-success-800">45 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-success-700">Equivale a:</span>
                      <span className="font-bold text-success-800">200 km en auto</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-success-700">Árboles salvados:</span>
                      <span className="font-bold text-success-800">2.3 árboles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Eco-Friendly Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 border-t border-gray-200 pt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Productos Eco-Amigables Destacados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de productos que cuidan el planeta sin comprometer la efectividad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Limpiador Natural Multiusos',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
                eco_features: ['100% Biodegradable', 'Sin Químicos Tóxicos', 'Envase Reciclable'],
                price: '$28.900',
                rating: 4.8
              },
              {
                name: 'Detergente Concentrado Eco',
                image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop',
                eco_features: ['Fórmula Concentrada', 'Menos Plástico', 'Ingredientes Naturales'],
                price: '$35.500',
                rating: 4.9
              },
              {
                name: 'Desinfectante a Base de Plantas',
                image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
                eco_features: ['Base Vegetal', 'Sin Alcohol', 'Aroma Natural'],
                price: '$22.700',
                rating: 4.7
              }
            ].map((product, index) => (
              <Card key={index} className="card card-hover">
                <div className="card-content">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {product.eco_features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Leaf className="w-3 h-3 text-success-600" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600">{product.price}</span>
                    <Button size="sm" className="btn btn-primary btn-sm">
                      Ver Producto
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Sustainability Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-16 border-t border-gray-200 pt-16"
        >
          <Card className="card bg-gradient-to-r from-success-600 to-primary-600 text-white">
            <div className="card-content text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Mantente Informado sobre Sostenibilidad
              </h2>
              <p className="text-success-100 mb-8 max-w-2xl mx-auto">
                Recibe tips, noticias y actualizaciones sobre nuestras iniciativas ambientales
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-success-300"
                />
                <Button variant="accent" className="btn btn-accent">
                  Suscribirse
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Sustainability;
