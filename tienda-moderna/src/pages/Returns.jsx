import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  RotateCcw, 
  Package, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  AlertTriangle,
  FileText,
  CreditCard,
  Truck,
  Shield,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Info,
  Search,
  Upload,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';

// Validation schema for return request
const returnSchema = z.object({
  orderNumber: z.string().min(1, 'El número de pedido es requerido'),
  email: z.string().email('Email inválido'),
  reason: z.string().min(1, 'Selecciona una razón para la devolución'),
  description: z.string().min(10, 'Describe el motivo con al menos 10 caracteres'),
  refundMethod: z.string().min(1, 'Selecciona un método de reembolso'),
});

const Returns = () => {
  const [activeTab, setActiveTab] = useState('policy');
  const [returnStatus, setReturnStatus] = useState(null);

  const form = useForm({
    resolver: zodResolver(returnSchema),
  });

  const returnReasons = [
    { value: 'defective', label: 'Producto defectuoso' },
    { value: 'wrong-item', label: 'Producto incorrecto' },
    { value: 'not-as-described', label: 'No coincide con la descripción' },
    { value: 'damaged', label: 'Producto dañado en envío' },
    { value: 'changed-mind', label: 'Cambié de opinión' },
    { value: 'size-issue', label: 'Problema de tamaño/cantidad' },
    { value: 'quality', label: 'Calidad no satisfactoria' },
    { value: 'other', label: 'Otro motivo' },
  ];

  const refundMethods = [
    { value: 'original-payment', label: 'Método de pago original' },
    { value: 'store-credit', label: 'Crédito en tienda' },
    { value: 'bank-transfer', label: 'Transferencia bancaria' },
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Solicita la Devolución',
      description: 'Completa el formulario con los detalles de tu pedido',
      icon: FileText,
      color: 'primary'
    },
    {
      step: 2,
      title: 'Revisión y Aprobación',
      description: 'Revisamos tu solicitud en 24-48 horas',
      icon: CheckCircle,
      color: 'accent'
    },
    {
      step: 3,
      title: 'Empaca y Envía',
      description: 'Te enviamos las instrucciones de empaque y etiqueta',
      icon: Package,
      color: 'success'
    },
    {
      step: 4,
      title: 'Procesamos el Reembolso',
      description: 'Una vez recibido, procesamos tu reembolso en 3-5 días',
      icon: CreditCard,
      color: 'info'
    }
  ];

  const onSubmit = async (data) => {
    try {
      // Process return request
      console.log('Return request:', data);
      setReturnStatus('submitted');
    } catch (error) {
      console.error('Error submitting return:', error);
    }
  };

  const tabs = [
    { id: 'policy', name: 'Política de Devoluciones', icon: Shield },
    { id: 'request', name: 'Solicitar Devolución', icon: RotateCcw },
    { id: 'track', name: 'Seguir Devolución', icon: Search },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'policy':
        return (
          <div className="space-y-8">
            {/* Return Policy Overview */}
            <Card className="card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Política de Devoluciones
                    </h2>
                    <p className="text-gray-600">
                      Tu satisfacción es nuestra prioridad
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-success-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">30 Días</h3>
                    <p className="text-gray-600 text-sm">Para solicitar devoluciones</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Reembolso</h3>
                    <p className="text-gray-600 text-sm">En productos elegibles</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-accent-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Envío Gratuito</h3>
                    <p className="text-gray-600 text-sm">Para devoluciones por defectos</p>
                  </div>
                </div>

                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Condiciones Generales</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Tienes 30 días calendario desde la fecha de entrega para solicitar una devolución</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Los productos deben estar en su empaque original y sin usar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Se requiere el número de pedido y comprobante de compra</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Los productos personalizados no son elegibles para devolución</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Return Process */}
            <Card className="card">
              <div className="card-header">
                <h3 className="text-xl font-semibold text-gray-900">Proceso de Devolución</h3>
                <p className="text-gray-600">Sigue estos simples pasos</p>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {returnProcess.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        step.color === 'primary' ? 'bg-primary-100' :
                        step.color === 'accent' ? 'bg-accent-100' :
                        step.color === 'success' ? 'bg-success-100' :
                        'bg-info-100'
                      }`}>
                        <step.icon className={`w-8 h-8 ${
                          step.color === 'primary' ? 'text-primary-600' :
                          step.color === 'accent' ? 'text-accent-600' :
                          step.color === 'success' ? 'text-success-600' :
                          'text-info-600'
                        }`} />
                      </div>
                      <div className="mb-2">
                        <Badge 
                          variant={step.color} 
                          className={`badge badge-${step.color} text-xs mb-2`}
                        >
                          Paso {step.step}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Eligible Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Productos Elegibles</h3>
                  </div>
                </div>
                <div className="card-content">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-sm">Productos de limpieza sin abrir</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-sm">Artículos defectuosos o dañados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-sm">Productos incorrectos enviados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-sm">Accesorios y herramientas nuevos</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="card">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-warning-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Productos No Elegibles</h3>
                  </div>
                </div>
                <div className="card-content">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-500" />
                      <span className="text-sm">Productos personalizados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-500" />
                      <span className="text-sm">Artículos usados o abiertos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-500" />
                      <span className="text-sm">Productos después de 30 días</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-500" />
                      <span className="text-sm">Artículos en oferta especial</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'request':
        return (
          <div className="max-w-2xl mx-auto">
            {returnStatus === 'submitted' ? (
              <Card className="card">
                <div className="card-content text-center py-12">
                  <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ¡Solicitud Enviada!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Hemos recibido tu solicitud de devolución. Te contactaremos dentro de 24-48 horas 
                    con las instrucciones de envío.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setReturnStatus(null)}
                      variant="outline" 
                      className="btn btn-outline"
                    >
                      Nueva Solicitud
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('track')}
                      className="btn btn-primary"
                    >
                      Seguir Devolución
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="card">
                <div className="card-header">
                  <div className="flex items-center gap-3">
                    <RotateCcw className="w-6 h-6 text-primary-600" />
                    <div>
                      <h2 className="text-2xl font-display font-bold text-gray-900">
                        Solicitar Devolución
                      </h2>
                      <p className="text-gray-600">
                        Completa el formulario para iniciar tu devolución
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        {...form.register('orderNumber')}
                        label="Número de Pedido"
                        placeholder="TM-2024-001234"
                        error={form.formState.errors.orderNumber?.message}
                        leftIcon={<Package className="w-4 h-4 text-gray-400" />}
                        className="input"
                      />
                      <Input
                        {...form.register('email')}
                        type="email"
                        label="Correo Electrónico"
                        placeholder="tu@email.com"
                        error={form.formState.errors.email?.message}
                        leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razón de la Devolución
                      </label>
                      <select
                        {...form.register('reason')}
                        className="input"
                      >
                        <option value="">Selecciona una razón</option>
                        {returnReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                      {form.formState.errors.reason && (
                        <p className="text-error-600 text-xs mt-1">
                          {form.formState.errors.reason.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción Detallada
                      </label>
                      <textarea
                        {...form.register('description')}
                        rows={4}
                        placeholder="Describe el motivo de la devolución con el mayor detalle posible..."
                        className="input"
                      />
                      {form.formState.errors.description && (
                        <p className="text-error-600 text-xs mt-1">
                          {form.formState.errors.description.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de Reembolso Preferido
                      </label>
                      <select
                        {...form.register('refundMethod')}
                        className="input"
                      >
                        <option value="">Selecciona un método</option>
                        {refundMethods.map((method) => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                      {form.formState.errors.refundMethod && (
                        <p className="text-error-600 text-xs mt-1">
                          {form.formState.errors.refundMethod.message}
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Información Importante</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Revisaremos tu solicitud en 24-48 horas</li>
                            <li>• Te enviaremos instrucciones de empaque por email</li>
                            <li>• El reembolso se procesa en 3-5 días hábiles</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="btn btn-primary">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Enviar Solicitud
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            )}
          </div>
        );

      case 'track':
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-primary-600" />
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">
                      Seguir Devolución
                    </h2>
                    <p className="text-gray-600">
                      Consulta el estado de tu devolución
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-4 mb-8">
                  <Input
                    label="Número de Devolución o Pedido"
                    placeholder="RET-2024-001234 o TM-2024-001234"
                    leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                    className="input"
                  />
                  <Button className="btn btn-primary w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar Devolución
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ingresa tu Número de Devolución
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Una vez que envíes tu solicitud, recibirás un número de seguimiento 
                    para consultar el estado de tu devolución.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
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
                Devoluciones y Reembolsos
              </h1>
              <p className="text-xl text-primary-100">
                Proceso fácil y transparente para tus devoluciones
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content text-center">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                ¿Necesitas Ayuda Adicional?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nuestro equipo de atención al cliente está disponible para ayudarte 
                con cualquier pregunta sobre devoluciones y reembolsos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="btn btn-primary">
                    <Phone className="w-4 h-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </Link>
                <Link to="/help">
                  <Button variant="outline" className="btn btn-outline">
                    <Info className="w-4 h-4 mr-2" />
                    Ver FAQ
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

export default Returns;
