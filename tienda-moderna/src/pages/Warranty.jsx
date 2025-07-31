import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Phone, 
  Mail, 
  Calendar,
  Package,
  Award,
  RefreshCw,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Breadcrumb from '../components/ui/Breadcrumb';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';

const Warranty = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const warrantyTypes = [
    {
      id: 'standard',
      name: 'Garantía Estándar',
      duration: '12 meses',
      coverage: 'Defectos de fabricación',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'Cubre defectos de fabricación y materiales por 12 meses desde la fecha de compra.'
    },
    {
      id: 'extended',
      name: 'Garantía Extendida',
      duration: '24 meses',
      coverage: 'Defectos + Desgaste normal',
      icon: Award,
      color: 'bg-purple-500',
      description: 'Incluye garantía estándar más cobertura por desgaste normal del producto.'
    },
    {
      id: 'premium',
      name: 'Garantía Premium',
      duration: '36 meses',
      coverage: 'Cobertura completa',
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Cobertura completa incluyendo reemplazo inmediato y soporte prioritario.'
    }
  ];

  const warrantyProcess = [
    {
      step: 1,
      title: 'Reportar Problema',
      description: 'Contacta nuestro servicio al cliente con tu número de pedido',
      icon: Phone,
      timeframe: 'Inmediato'
    },
    {
      step: 2,
      title: 'Evaluación',
      description: 'Nuestro equipo técnico evalúa el problema reportado',
      icon: Search,
      timeframe: '1-2 días hábiles'
    },
    {
      step: 3,
      title: 'Resolución',
      description: 'Reemplazo, reparación o reembolso según corresponda',
      icon: RefreshCw,
      timeframe: '3-5 días hábiles'
    }
  ];

  const faqItems = [
    {
      question: '¿Qué cubre la garantía?',
      answer: 'La garantía cubre defectos de fabricación, materiales defectuosos y mal funcionamiento del producto bajo uso normal. No cubre daños por mal uso, accidentes o desgaste normal.'
    },
    {
      question: '¿Cómo hago válida mi garantía?',
      answer: 'Para hacer válida tu garantía, necesitas tu número de pedido o factura de compra. Puedes contactarnos por teléfono, email o chat en línea.'
    },
    {
      question: '¿Cuánto tiempo toma el proceso?',
      answer: 'El proceso típico toma entre 3-7 días hábiles desde el reporte inicial hasta la resolución, dependiendo de la complejidad del caso.'
    },
    {
      question: '¿Puedo extender mi garantía?',
      answer: 'Sí, ofrecemos opciones de garantía extendida que puedes adquirir dentro de los primeros 30 días después de tu compra.'
    },
    {
      question: '¿Qué pasa si mi producto está descontinuado?',
      answer: 'Si tu producto está descontinuado, te ofreceremos un producto equivalente o superior, o un reembolso completo.'
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-300" />
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Garantías
                </h1>
              </div>
              <p className="text-xl text-blue-100 max-w-2xl">
                Protegemos tu inversión con garantías completas y servicio al cliente excepcional. 
                Tu satisfacción es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Resumen', icon: Shield },
              { id: 'types', label: 'Tipos de Garantía', icon: Award },
              { id: 'process', label: 'Proceso', icon: RefreshCw },
              { id: 'faq', label: 'Preguntas Frecuentes', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Ayuda', href: '/help' },
          { label: 'Garantías' }
        ]} className="mb-8" />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card text-center">
                <div className="card-content">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    100% Garantizado
                  </h3>
                  <p className="text-gray-600">
                    Todos nuestros productos incluyen garantía completa contra defectos de fabricación
                  </p>
                </div>
              </Card>

              <Card className="card text-center">
                <div className="card-content">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Respuesta Rápida
                  </h3>
                  <p className="text-gray-600">
                    Procesamos todas las reclamaciones de garantía en menos de 48 horas
                  </p>
                </div>
              </Card>

              <Card className="card text-center">
                <div className="card-content">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Reemplazo Fácil
                  </h3>
                  <p className="text-gray-600">
                    Proceso simple de reemplazo sin complicaciones ni papeleo excesivo
                  </p>
                </div>
              </Card>
            </div>

            {/* Warranty Coverage */}
            <Card className="card">
              <Card.Header>
                <h2 className="text-2xl font-bold text-gray-900">¿Qué Está Cubierto?</h2>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Cubierto por Garantía
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'Defectos de fabricación',
                        'Materiales defectuosos',
                        'Mal funcionamiento del producto',
                        'Problemas de calidad',
                        'Envases dañados en tránsito',
                        'Productos que no cumplen especificaciones'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      No Cubierto por Garantía
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'Daños por mal uso o negligencia',
                        'Desgaste normal por uso',
                        'Daños accidentales',
                        'Modificaciones no autorizadas',
                        'Daños por almacenamiento inadecuado',
                        'Productos vencidos por falta de uso'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        )}

        {/* Types Tab */}
        {activeTab === 'types' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tipos de Garantía Disponibles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ofrecemos diferentes niveles de garantía para adaptarnos a tus necesidades específicas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {warrantyTypes.map((warranty, index) => (
                <motion.div
                  key={warranty.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card h-full border-2 hover:border-primary-300 transition-colors">
                    <div className="card-content">
                      <div className={`w-16 h-16 ${warranty.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <warranty.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                        {warranty.name}
                      </h3>
                      
                      <div className="text-center mb-4">
                        <Badge variant="outline" size="lg" className="badge badge-outline">
                          {warranty.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-center mb-4">
                        {warranty.description}
                      </p>
                      
                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-700">
                          Cobertura: {warranty.coverage}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <Card className="card">
              <Card.Header>
                <h3 className="text-xl font-semibold text-gray-900">
                  Comparación de Garantías
                </h3>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-semibold text-gray-900">Característica</th>
                        <th className="text-center p-4 font-semibold text-gray-900">Estándar</th>
                        <th className="text-center p-4 font-semibold text-gray-900">Extendida</th>
                        <th className="text-center p-4 font-semibold text-gray-900">Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          feature: 'Duración',
                          standard: '12 meses',
                          extended: '24 meses',
                          premium: '36 meses'
                        },
                        {
                          feature: 'Defectos de fabricación',
                          standard: '✅',
                          extended: '✅',
                          premium: '✅'
                        },
                        {
                          feature: 'Desgaste normal',
                          standard: '❌',
                          extended: '✅',
                          premium: '✅'
                        },
                        {
                          feature: 'Reemplazo inmediato',
                          standard: '❌',
                          extended: '❌',
                          premium: '✅'
                        },
                        {
                          feature: 'Soporte prioritario',
                          standard: '❌',
                          extended: '❌',
                          premium: '✅'
                        }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                          <td className="p-4 text-center">{row.standard}</td>
                          <td className="p-4 text-center">{row.extended}</td>
                          <td className="p-4 text-center">{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Content>
            </Card>
          </motion.div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Proceso de Garantía
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hacer válida tu garantía es fácil y rápido. Sigue estos simples pasos
              </p>
            </div>

            {/* Process Steps */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              
              <div className="space-y-8">
                {warrantyProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative flex items-start"
                  >
                    <div className="relative z-10 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                      {step.step}
                    </div>
                    
                    <div className="flex-1">
                      <Card className="card">
                        <div className="card-content">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <step.icon className="w-6 h-6 text-primary-600" />
                              <h3 className="text-xl font-semibold text-gray-900">
                                {step.title}
                              </h3>
                            </div>
                            <Badge variant="outline" className="badge badge-outline">
                              {step.timeframe}
                            </Badge>
                          </div>
                          <p className="text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <Card className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
              <div className="card-content text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¿Necesitas Hacer Válida tu Garantía?
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Nuestro equipo de soporte está listo para ayudarte con tu reclamación de garantía
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn btn-primary">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar: +57 300 123 4567
                  </Button>
                  <Button variant="outline" className="btn btn-outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email: garantias@tiendamoderna.com
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes sobre Garantías
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encuentra respuestas a las preguntas más comunes sobre nuestras garantías
              </p>
            </div>

            {/* Search FAQ */}
            <div className="max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQ.map((item, index) => (
                <Card key={index} className="card">
                  <div className="card-content">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredFAQ.length === 0 && searchTerm && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No se encontraron preguntas que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Warranty;
