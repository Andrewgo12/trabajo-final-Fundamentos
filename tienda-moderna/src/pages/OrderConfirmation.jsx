import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, CreditCard, Download, Share2, Home, Star, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Redirect if no order data
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodName = (method) => {
    const methods = {
      card: 'Tarjeta de Crédito/Débito',
      pse: 'PSE',
      cash: 'Efectivo contra entrega'
    };
    return methods[method] || method;
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-500">Número de pedido:</span>
              <Badge variant="primary" size="lg">
                {order.id}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Estado del Pedido
                  </h2>
                </Card.Header>
                <Card.Content>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium text-gray-900">Confirmado</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="success">
                      En proceso
                    </Badge>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">
                          Entrega estimada
                        </p>
                        <p className="text-sm text-blue-700">
                          {formatDate(estimatedDelivery)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Shipping Information */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Información de Envío
                  </h2>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">
                      {order.shippingAddress.name}
                    </p>
                    <p className="text-gray-600">{order.shippingAddress.email}</p>
                    <p className="text-gray-600">{order.shippingAddress.phone}</p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-600">{order.shippingAddress.address}</p>
                      <p className="text-gray-600">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </p>
                      <p className="text-gray-600">{order.shippingAddress.zipCode}</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Payment Information */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Información de Pago
                  </h2>
                </Card.Header>
                <Card.Content>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {getPaymentMethodName(order.paymentMethod)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Pago procesado exitosamente
                      </p>
                    </div>
                    <Badge variant="success">
                      Pagado
                    </Badge>
                  </div>
                </Card.Content>
              </Card>

              {/* Order Items */}
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-semibold">Productos Pedidos</h2>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-sm text-gray-600">
                            Cantidad: {item.quantity} × ${item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold">Resumen del Pedido</h3>
                  </Card.Header>
                  <Card.Content className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío:</span>
                        <span>
                          {order.shipping === 0 ? (
                            <Badge variant="success" size="sm">Gratis</Badge>
                          ) : (
                            `$${order.shipping.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Descuento:</span>
                          <span>-${order.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${order.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <hr />

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar Factura
                      </Button>
                      
                      <Button className="w-full" variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir Pedido
                      </Button>
                      
                      <Link to="/orders" className="block">
                        <Button className="w-full">
                          Ver Mis Pedidos
                        </Button>
                      </Link>
                    </div>

                    <hr />

                    {/* Support */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        ¿Necesitas ayuda?
                      </p>
                      <Button variant="ghost" size="sm">
                        Contactar Soporte
                      </Button>
                    </div>
                  </Card.Content>
                </Card>

                {/* Next Steps */}
                <Card className="mt-6">
                  <Card.Header>
                    <h3 className="text-lg font-semibold">Próximos Pasos</h3>
                  </Card.Header>
                  <Card.Content>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Preparación del pedido</p>
                          <p className="text-gray-600">1-2 días hábiles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Envío</p>
                          <p className="text-gray-600">1-2 días hábiles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Entrega</p>
                          <p className="text-gray-600">En tu dirección</p>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              ¿Necesitas algo más?
            </p>
            <Link to="/products">
              <Button size="lg">
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Seguimiento del Pedido
          </h2>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {[
              {
                status: 'Pedido Confirmado',
                time: 'Hace 5 minutos',
                completed: true,
                icon: CheckCircle,
                description: 'Tu pedido ha sido confirmado y está siendo procesado'
              },
              {
                status: 'Preparando Pedido',
                time: 'En proceso',
                completed: false,
                current: true,
                icon: Package,
                description: 'Estamos preparando tus productos para el envío'
              },
              {
                status: 'En Camino',
                time: 'Estimado: 2-3 días',
                completed: false,
                icon: Truck,
                description: 'Tu pedido será enviado y recibirás el código de seguimiento'
              },
              {
                status: 'Entregado',
                time: 'Pendiente',
                completed: false,
                icon: Home,
                description: 'Tu pedido será entregado en la dirección especificada'
              }
            ].map((step, index) => (
              <div key={index} className="relative flex items-start pb-8 last:pb-0">
                <div className={`
                  relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                  ${step.completed
                    ? 'bg-success-600 text-white'
                    : step.current
                      ? 'bg-primary-600 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  <step.icon className="w-4 h-4" />
                </div>

                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${
                      step.completed || step.current ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.status}
                    </h3>
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Support */}
        <div className="mt-12 border-t border-gray-200 pt-12">
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Necesitas Ayuda?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta sobre tu pedido
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn btn-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar Soporte
                </Button>
                <Button variant="outline" className="btn btn-outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="btn btn-outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat en Vivo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
