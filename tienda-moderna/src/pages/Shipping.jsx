import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  Clock, 
  MapPin, 
  DollarSign, 
  Shield, 
  ArrowLeft,
  Calculator,
  Globe,
  Plane,
  Home,
  Building,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Shipping = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  const shippingZones = [
    {
      name: 'Bogotá y Área Metropolitana',
      cities: ['Bogotá', 'Soacha', 'Chía', 'Cajicá', 'Zipaquirá', 'Facatativá'],
      deliveryTime: '1-2 días hábiles',
      cost: 8000,
      freeShippingMin: 50000,
      icon: Building,
      color: 'primary'
    },
    {
      name: 'Ciudades Principales',
      cities: ['Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Santa Marta', 'Villavicencio'],
      deliveryTime: '2-3 días hábiles',
      cost: 12000,
      freeShippingMin: 50000,
      icon: Globe,
      color: 'accent'
    },
    {
      name: 'Ciudades Intermedias',
      cities: ['Pasto', 'Popayán', 'Neiva', 'Armenia', 'Tunja', 'Montería', 'Sincelejo', 'Valledupar', 'Riohacha', 'Florencia'],
      deliveryTime: '3-5 días hábiles',
      cost: 15000,
      freeShippingMin: 50000,
      icon: Truck,
      color: 'success'
    },
    {
      name: 'Resto del País',
      cities: ['Otras ciudades y municipios'],
      deliveryTime: '5-8 días hábiles',
      cost: 18000,
      freeShippingMin: 50000,
      icon: Package,
      color: 'warning'
    }
  ];

  const shippingMethods = [
    {
      name: 'Envío Estándar',
      description: 'Entrega en horario laboral',
      icon: Package,
      features: ['Seguimiento incluido', 'Entrega en dirección', 'Horario: 8AM - 6PM']
    },
    {
      name: 'Envío Express',
      description: 'Entrega prioritaria',
      icon: Plane,
      features: ['Entrega más rápida', 'Seguimiento en tiempo real', 'Soporte prioritario'],
      additionalCost: 5000
    },
    {
      name: 'Recogida en Punto',
      description: 'Recoge en punto autorizado',
      icon: MapPin,
      features: ['Sin costo adicional', 'Horarios extendidos', 'Múltiples ubicaciones'],
      discount: 2000
    }
  ];

  const calculateShipping = () => {
    if (!selectedCity || !orderValue) return;

    const value = parseFloat(orderValue);
    const zone = shippingZones.find(zone => 
      zone.cities.some(city => city.toLowerCase().includes(selectedCity.toLowerCase()))
    );

    if (zone) {
      const cost = value >= zone.freeShippingMin ? 0 : zone.cost;
      setShippingCost({
        zone: zone.name,
        cost,
        deliveryTime: zone.deliveryTime,
        freeShipping: value >= zone.freeShippingMin
      });
    } else {
      setShippingCost({
        zone: 'Resto del País',
        cost: orderValue >= 50000 ? 0 : 18000,
        deliveryTime: '5-8 días hábiles',
        freeShipping: orderValue >= 50000
      });
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
                Información de Envíos
              </h1>
              <p className="text-xl text-primary-100">
                Todo lo que necesitas saber sobre nuestros envíos y entregas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Calculadora de Envío */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    Calculadora de Envío
                  </h2>
                  <p className="text-gray-600">
                    Calcula el costo y tiempo de entrega para tu pedido
                  </p>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad de Destino
                  </label>
                  <input
                    type="text"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder="Ej: Bogotá, Medellín, Cali..."
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor del Pedido (COP)
                  </label>
                  <input
                    type="number"
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value)}
                    placeholder="50000"
                    className="input"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={calculateShipping}
                    className="btn btn-primary w-full"
                    disabled={!selectedCity || !orderValue}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calcular
                  </Button>
                </div>
              </div>

              {shippingCost && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary-50 border border-primary-200 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-primary-600" />
                    <h3 className="text-lg font-semibold text-primary-900">
                      Resultado del Cálculo
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-primary-700 font-medium">Zona de Envío</p>
                      <p className="text-primary-900 font-semibold">{shippingCost.zone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-700 font-medium">Costo de Envío</p>
                      <p className="text-primary-900 font-semibold">
                        {shippingCost.freeShipping ? (
                          <span className="text-success-600">¡GRATIS!</span>
                        ) : (
                          `$${shippingCost.cost.toLocaleString()}`
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-700 font-medium">Tiempo de Entrega</p>
                      <p className="text-primary-900 font-semibold">{shippingCost.deliveryTime}</p>
                    </div>
                  </div>
                  {shippingCost.freeShipping && (
                    <div className="mt-4 flex items-center gap-2 text-success-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        ¡Tu pedido califica para envío gratuito!
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Zonas de Envío */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Zonas de Envío
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cubrimos todo el territorio nacional con diferentes tiempos y costos de entrega
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card card-hover h-full">
                  <div className="card-content text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      zone.color === 'primary' ? 'bg-primary-100' :
                      zone.color === 'accent' ? 'bg-accent-100' :
                      zone.color === 'success' ? 'bg-success-100' :
                      'bg-warning-100'
                    }`}>
                      <zone.icon className={`w-8 h-8 ${
                        zone.color === 'primary' ? 'text-primary-600' :
                        zone.color === 'accent' ? 'text-accent-600' :
                        zone.color === 'success' ? 'text-success-600' :
                        'text-warning-600'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {zone.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{zone.deliveryTime}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          ${zone.cost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant="success" 
                      className="badge badge-success text-xs"
                    >
                      Gratis desde ${zone.freeShippingMin.toLocaleString()}
                    </Badge>
                    <div className="mt-4">
                      <details className="text-left">
                        <summary className="cursor-pointer text-sm font-medium text-primary-600 hover:text-primary-700">
                          Ver ciudades incluidas
                        </summary>
                        <div className="mt-2 text-xs text-gray-600">
                          {zone.cities.slice(0, 5).join(', ')}
                          {zone.cities.length > 5 && ` y ${zone.cities.length - 5} más`}
                        </div>
                      </details>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Métodos de Envío */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Métodos de Envío
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige la opción que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card card-hover h-full">
                  <div className="card-content">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <method.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                    
                    {method.additionalCost && (
                      <div className="mb-4">
                        <Badge variant="warning" className="badge badge-warning">
                          +${method.additionalCost.toLocaleString()} adicional
                        </Badge>
                      </div>
                    )}
                    
                    {method.discount && (
                      <div className="mb-4">
                        <Badge variant="success" className="badge badge-success">
                          -${method.discount.toLocaleString()} de descuento
                        </Badge>
                      </div>
                    )}

                    <ul className="space-y-2">
                      {method.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Información Importante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="card">
            <div className="card-header">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  Información Importante
                </h2>
              </div>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary-600" />
                    Políticas de Envío
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Envío gratuito en compras superiores a $50.000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Seguimiento incluido en todos los envíos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Seguro de mercancía incluido</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Empaque ecológico y seguro</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-warning-600" />
                    Consideraciones Especiales
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Los tiempos de entrega son estimados y pueden variar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Entregas solo en días hábiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Se requiere identificación para recibir el pedido</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-warning-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Productos frágiles requieren manejo especial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                ¿Tienes Preguntas sobre Envíos?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de atención al cliente está disponible para resolver 
                cualquier duda sobre envíos, entregas y seguimiento de pedidos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="btn btn-primary">
                    Contactar Soporte
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline" className="btn btn-outline">
                    Ver Preguntas Frecuentes
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
