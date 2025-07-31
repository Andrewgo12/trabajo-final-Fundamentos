import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  Eye, 
  Download,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';

const Orders = () => {
  const { isAuthenticated, showLoginModal } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 45000,
      items: [
        { name: 'Detergente Líquido Premium', quantity: 2, price: 15000 },
        { name: 'Jabón Antibacterial', quantity: 1, price: 15000 }
      ],
      shippingAddress: 'Calle 123 #45-67, Bogotá',
      deliveredAt: '2024-01-22'
    },
    {
      id: 'ORD-002',
      date: '2024-01-25',
      status: 'shipped',
      total: 32000,
      items: [
        { name: 'Desinfectante en Spray', quantity: 1, price: 20000 },
        { name: 'Toallas de Papel', quantity: 1, price: 12000 }
      ],
      shippingAddress: 'Calle 123 #45-67, Bogotá',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-003',
      date: '2024-01-28',
      status: 'processing',
      total: 28000,
      items: [
        { name: 'Trapeador de Microfibra', quantity: 1, price: 30000 }
      ],
      shippingAddress: 'Calle 123 #45-67, Bogotá'
    },
    {
      id: 'ORD-004',
      date: '2024-01-30',
      status: 'cancelled',
      total: 25000,
      items: [
        { name: 'Escoba de Madera', quantity: 1, price: 25000 }
      ],
      shippingAddress: 'Calle 123 #45-67, Bogotá',
      cancelledAt: '2024-01-30'
    }
  ]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tus pedidos
          </h2>
          <p className="text-gray-600 mb-8">
            Accede a tu cuenta para ver el historial de tus compras y seguir tus envíos.
          </p>
          <Button onClick={showLoginModal} className="btn btn-primary">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { 
        label: 'Pendiente', 
        color: 'warning', 
        icon: Clock,
        description: 'Tu pedido está siendo procesado'
      },
      processing: { 
        label: 'Procesando', 
        color: 'primary', 
        icon: Package,
        description: 'Estamos preparando tu pedido'
      },
      shipped: { 
        label: 'Enviado', 
        color: 'primary', 
        icon: Truck,
        description: 'Tu pedido está en camino'
      },
      delivered: { 
        label: 'Entregado', 
        color: 'success', 
        icon: CheckCircle,
        description: 'Tu pedido ha sido entregado'
      },
      cancelled: { 
        label: 'Cancelado', 
        color: 'error', 
        icon: X,
        description: 'Este pedido fue cancelado'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Mi Cuenta', href: '/profile' },
            { label: 'Mis Pedidos' }
          ]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Mis Pedidos
              </h1>
              <p className="text-gray-600">
                {filteredOrders.length === 0 
                  ? 'No tienes pedidos' 
                  : `${filteredOrders.length} pedido${filteredOrders.length !== 1 ? 's' : ''} encontrado${filteredOrders.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar pedidos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                  className="input w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-48"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== 'all' ? 'No se encontraron pedidos' : 'No tienes pedidos aún'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || statusFilter !== 'all' 
                ? 'Intenta ajustar tus filtros de búsqueda'
                : 'Cuando realices tu primera compra, aparecerá aquí.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn btn-primary">
                  Explorar Productos
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="outline" className="btn btn-outline">
                  Ver Ofertas
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card">
                    <div className="card-content">
                      {/* Order Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            statusInfo.color === 'success' ? 'bg-success-100' :
                            statusInfo.color === 'error' ? 'bg-error-100' :
                            statusInfo.color === 'warning' ? 'bg-warning-100' :
                            'bg-primary-100'
                          }`}>
                            <StatusIcon className={`w-6 h-6 ${
                              statusInfo.color === 'success' ? 'text-success-600' :
                              statusInfo.color === 'error' ? 'text-error-600' :
                              statusInfo.color === 'warning' ? 'text-warning-600' :
                              'text-primary-600'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Pedido {order.id}
                              </h3>
                              <Badge 
                                variant={statusInfo.color} 
                                className={`badge badge-${statusInfo.color}`}
                              >
                                {statusInfo.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              ${order.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn btn-outline"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalles
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn btn-outline"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-3">
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  Cantidad: {item.quantity} × ${item.price.toLocaleString()}
                                </p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                ${(item.quantity * item.price).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Status Details */}
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {statusInfo.description}
                            </p>
                            {order.trackingNumber && (
                              <p className="text-sm text-gray-600">
                                Número de seguimiento: <span className="font-mono">{order.trackingNumber}</span>
                              </p>
                            )}
                            {order.deliveredAt && (
                              <p className="text-sm text-success-600">
                                Entregado el {formatDate(order.deliveredAt)}
                              </p>
                            )}
                            {order.cancelledAt && (
                              <p className="text-sm text-error-600">
                                Cancelado el {formatDate(order.cancelledAt)}
                              </p>
                            )}
                          </div>
                          
                          {order.status === 'delivered' && (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="btn btn-outline"
                              >
                                Volver a Comprar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="btn btn-outline"
                              >
                                Calificar
                              </Button>
                            </div>
                          )}
                          
                          {order.status === 'shipped' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="btn btn-outline"
                            >
                              <Truck className="w-4 h-4 mr-2" />
                              Rastrear Envío
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
