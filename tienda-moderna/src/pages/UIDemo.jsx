import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  ShoppingCart, 
  User, 
  Settings, 
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import all UI components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Tooltip from '../components/ui/Tooltip';
import Dropdown, { DropdownItem, DropdownDivider, DropdownHeader, Select } from '../components/ui/Dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, FAQAccordion } from '../components/ui/Accordion';

const UIDemo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [activeTab, setActiveTab] = useState('buttons');
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const selectOptions = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3', disabled: true },
    { value: 'option4', label: 'Opción 4' },
  ];

  const faqItems = [
    {
      id: '1',
      question: '¿Cómo puedo realizar un pedido?',
      answer: 'Puedes realizar un pedido navegando por nuestro catálogo, agregando productos al carrito y siguiendo el proceso de checkout.'
    },
    {
      id: '2',
      question: '¿Cuáles son los métodos de pago disponibles?',
      answer: 'Aceptamos tarjetas de crédito, débito, PSE, y pagos en efectivo contra entrega.'
    },
    {
      id: '3',
      question: '¿Hacen envíos a todo el país?',
      answer: 'Sí, realizamos envíos a todo Colombia. Los tiempos de entrega varían según la ciudad de destino.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-primary-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">
                Demostración de Componentes UI
              </h1>
              <p className="text-xl text-primary-100">
                Todos los componentes de interfaz de usuario en acción
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="buttons">Botones</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="modals">Modales</TabsTrigger>
            <TabsTrigger value="dropdowns">Dropdowns</TabsTrigger>
            <TabsTrigger value="accordions">Accordions</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons">
            <div className="space-y-8">
              <Card className="card">
                <div className="card-header">
                  <h3 className="text-xl font-semibold">Botones - Variantes</h3>
                  <p className="text-gray-600">Diferentes estilos de botones disponibles</p>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Primarios</h4>
                      <Button className="btn btn-primary w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                      <Button className="btn btn-secondary w-full">
                        <Heart className="w-4 h-4 mr-2" />
                        Favoritos
                      </Button>
                      <Button className="btn btn-accent w-full">
                        <Star className="w-4 h-4 mr-2" />
                        Calificar
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Outline</h4>
                      <Button variant="outline" className="btn btn-outline w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="outline" className="btn btn-outline w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button variant="outline" className="btn btn-outline w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Subir
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Estados</h4>
                      <Button className="btn btn-success w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Éxito
                      </Button>
                      <Button className="btn btn-warning w-full">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Advertencia
                      </Button>
                      <Button className="btn btn-danger w-full">
                        <XCircle className="w-4 h-4 mr-2" />
                        Error
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card">
                <div className="card-header">
                  <h3 className="text-xl font-semibold">Botones - Tamaños</h3>
                </div>
                <div className="card-content">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm" className="btn btn-primary btn-sm">Pequeño</Button>
                    <Button size="md" className="btn btn-primary">Mediano</Button>
                    <Button size="lg" className="btn btn-primary btn-lg">Grande</Button>
                    <Button size="xl" className="btn btn-primary btn-xl">Extra Grande</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Inputs Tab */}
          <TabsContent value="inputs">
            <div className="space-y-8">
              <Card className="card">
                <div className="card-header">
                  <h3 className="text-xl font-semibold">Campos de Entrada</h3>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Input
                        label="Nombre completo"
                        placeholder="Ingresa tu nombre"
                        leftIcon={<User className="w-4 h-4 text-gray-400" />}
                        className="input"
                      />
                      <Input
                        label="Correo electrónico"
                        type="email"
                        placeholder="tu@email.com"
                        className="input"
                      />
                      <div className="relative">
                        <Input
                          label="Contraseña"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        label="Búsqueda"
                        placeholder="Buscar productos..."
                        leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                        rightIcon={<Filter className="w-4 h-4 text-gray-400" />}
                        className="input"
                      />
                      <Input
                        label="Campo con error"
                        placeholder="Campo requerido"
                        error="Este campo es obligatorio"
                        className="input input-error"
                      />
                      <Input
                        label="Campo deshabilitado"
                        placeholder="No editable"
                        disabled
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="card">
                <div className="card-header">
                  <h3 className="text-xl font-semibold">Select y Textarea</h3>
                </div>
                <div className="card-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selecciona una opción
                        </label>
                        <Select
                          options={selectOptions}
                          value={selectedValue}
                          onChange={setSelectedValue}
                          placeholder="Elige una opción..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Comentarios
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Escribe tus comentarios aquí..."
                          className="input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="card">
                  <div className="card-header">
                    <h3 className="text-lg font-semibold">Card Básica</h3>
                    <p className="text-gray-600">Descripción de la card</p>
                  </div>
                  <div className="card-content">
                    <p className="text-gray-700">
                      Contenido de la card con información relevante.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Button size="sm" className="btn btn-primary btn-sm">Acción</Button>
                  </div>
                </Card>

                <Card className="card card-hover">
                  <div className="card-content">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Card con Hover</h3>
                        <p className="text-sm text-gray-600">Efecto hover</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Esta card tiene efecto hover para mejor interacción.
                    </p>
                  </div>
                </Card>

                <Card className="card bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
                  <div className="card-content">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="primary" className="badge badge-primary">Nuevo</Badge>
                      <Badge variant="success" className="badge badge-success">Popular</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">Card con Gradiente</h3>
                    <p className="text-gray-700 text-sm">
                      Card con fondo degradado y badges.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Modals Tab */}
          <TabsContent value="modals">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-xl font-semibold">Modales</h3>
                <p className="text-gray-600">Diferentes tipos de modales disponibles</p>
              </div>
              <div className="card-content">
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary"
                  >
                    Abrir Modal
                  </Button>
                  
                  <Tooltip content="Este es un tooltip informativo">
                    <Button className="btn btn-outline">
                      <Info className="w-4 h-4 mr-2" />
                      Hover para Tooltip
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Modal de Demostración"
              size="md"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  Este es un modal de demostración que muestra cómo funciona el componente Modal.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowModal(false)}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => setShowModal(false)}
                    className="btn btn-primary"
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </Modal>
          </TabsContent>

          {/* Dropdowns Tab */}
          <TabsContent value="dropdowns">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-xl font-semibold">Dropdowns</h3>
              </div>
              <div className="card-content">
                <div className="flex flex-wrap gap-4">
                  <Dropdown
                    trigger={
                      <Button className="btn btn-outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configuración
                      </Button>
                    }
                  >
                    <DropdownHeader>Cuenta</DropdownHeader>
                    <DropdownItem>
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </DropdownItem>
                    <DropdownItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Configuración
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownHeader>Acciones</DropdownHeader>
                    <DropdownItem>
                      <Bell className="w-4 h-4 mr-2" />
                      Notificaciones
                    </DropdownItem>
                    <DropdownItem>
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritos
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Accordions Tab */}
          <TabsContent value="accordions">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-xl font-semibold">Accordions</h3>
              </div>
              <div className="card-content">
                <FAQAccordion items={faqItems} />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Componentes UI Completos
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Todos estos componentes están disponibles y completamente funcionales 
                en nuestra tienda moderna de productos de limpieza.
              </p>
              <Link to="/">
                <Button className="btn btn-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a la Tienda
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UIDemo;
