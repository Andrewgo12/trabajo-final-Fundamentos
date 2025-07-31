import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Truck, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../stores/useStore';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import Progress from '../components/ui/Progress';
import Rating from '../components/ui/Rating';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';
import Dropdown from '../components/ui/Dropdown';

// Validation schemas
const shippingSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Teléfono requerido'),
  address: z.string().min(1, 'Dirección requerida'),
  city: z.string().min(1, 'Ciudad requerida'),
  state: z.string().min(1, 'Departamento requerido'),
  zipCode: z.string().min(1, 'Código postal requerido'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Número de tarjeta inválido'),
  expiryDate: z.string().min(5, 'Fecha de vencimiento inválida'),
  cvv: z.string().min(3, 'CVV inválido'),
  cardName: z.string().min(1, 'Nombre en la tarjeta requerido'),
});

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping');
  const [selectedRating, setSelectedRating] = useState(5);
  
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useStore();
  const { user, isAuthenticated, showLoginModal } = useAuth();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50000 ? 0 : 8000;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.percentage) / 100 : 0;
  const total = subtotal + shipping - discount;

  // Forms
  const shippingForm = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
    },
  });

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos para continuar con la compra
          </p>
          <Button onClick={() => navigate('/products')}>
            Ir a Productos
          </Button>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inicia sesión para continuar
          </h2>
          <p className="text-gray-600 mb-6">
            Necesitas una cuenta para realizar la compra
          </p>
          <Button onClick={showLoginModal}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const applyCoupon = () => {
    // Simulate coupon validation
    const validCoupons = {
      'DESCUENTO10': { percentage: 10, description: '10% de descuento' },
      'BIENVENIDO': { percentage: 15, description: '15% de descuento de bienvenida' },
      'ENVIOGRATIS': { percentage: 5, description: '5% de descuento' },
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        ...validCoupons[couponCode.toUpperCase()]
      });
    } else {
      alert('Cupón inválido');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const onShippingSubmit = (data) => {
    setCurrentStep(2);
  };

  const onPaymentSubmit = async (data) => {
    setCurrentStep(3);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const order = {
        id: 'ORD-' + Date.now(),
        items: cart,
        subtotal,
        shipping,
        discount,
        total,
        shippingAddress: shippingForm.getValues(),
        paymentMethod,
        status: 'confirmed',
        createdAt: new Date(),
      };

      // Clear cart and redirect
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    }, 2000);
  };

  const steps = [
    { id: 1, name: 'Envío', icon: MapPin },
    { id: 2, name: 'Pago', icon: CreditCard },
    { id: 3, name: 'Confirmación', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Carrito', href: '/cart' },
            { label: 'Checkout' }
          ]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <Card.Header>
                    <h2 className="text-xl font-semibold">Información de Envío</h2>
                  </Card.Header>
                  <Card.Content>
                    <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          {...shippingForm.register('name')}
                          label="Nombre Completo"
                          error={shippingForm.formState.errors.name?.message}
                          leftIcon={<User className="w-4 h-4 text-gray-400" />}
                        />
                        <Input
                          {...shippingForm.register('email')}
                          type="email"
                          label="Email"
                          error={shippingForm.formState.errors.email?.message}
                          leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
                        />
                      </div>
                      
                      <Input
                        {...shippingForm.register('phone')}
                        label="Teléfono"
                        error={shippingForm.formState.errors.phone?.message}
                        leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
                      />
                      
                      <Input
                        {...shippingForm.register('address')}
                        label="Dirección"
                        error={shippingForm.formState.errors.address?.message}
                        leftIcon={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          {...shippingForm.register('city')}
                          label="Ciudad"
                          error={shippingForm.formState.errors.city?.message}
                        />
                        <Input
                          {...shippingForm.register('state')}
                          label="Departamento"
                          error={shippingForm.formState.errors.state?.message}
                        />
                        <Input
                          {...shippingForm.register('zipCode')}
                          label="Código Postal"
                          error={shippingForm.formState.errors.zipCode?.message}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg">
                        Continuar al Pago
                      </Button>
                    </form>
                  </Card.Content>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <Card.Header>
                    <h2 className="text-xl font-semibold">Método de Pago</h2>
                  </Card.Header>
                  <Card.Content>
                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'card' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <span className="font-medium">Tarjeta</span>
                          </div>
                        </label>
                        
                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'pse' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="pse"
                            checked={paymentMethod === 'pse'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <Shield className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <span className="font-medium">PSE</span>
                          </div>
                        </label>
                        
                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'cash' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <Truck className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                            <span className="font-medium">Efectivo</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Card Form */}
                    {paymentMethod === 'card' && (
                      <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                        <Input
                          {...paymentForm.register('cardNumber')}
                          label="Número de Tarjeta"
                          placeholder="1234 5678 9012 3456"
                          error={paymentForm.formState.errors.cardNumber?.message}
                          leftIcon={<CreditCard className="w-4 h-4 text-gray-400" />}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            {...paymentForm.register('expiryDate')}
                            label="Fecha de Vencimiento"
                            placeholder="MM/YY"
                            error={paymentForm.formState.errors.expiryDate?.message}
                          />
                          <Input
                            {...paymentForm.register('cvv')}
                            label="CVV"
                            placeholder="123"
                            error={paymentForm.formState.errors.cvv?.message}
                          />
                        </div>
                        
                        <Input
                          {...paymentForm.register('cardName')}
                          label="Nombre en la Tarjeta"
                          error={paymentForm.formState.errors.cardName?.message}
                        />
                        
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1"
                          >
                            Volver
                          </Button>
                          <Button type="submit" className="flex-1" size="lg">
                            Realizar Pago
                          </Button>
                        </div>
                      </form>
                    )}

                    {/* Other payment methods */}
                    {paymentMethod !== 'card' && (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          {paymentMethod === 'pse' 
                            ? 'Serás redirigido a tu banco para completar el pago.'
                            : 'Pagarás en efectivo al recibir tu pedido.'
                          }
                        </p>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                            className="flex-1"
                          >
                            Volver
                          </Button>
                          <Button 
                            onClick={() => onPaymentSubmit({})}
                            className="flex-1" 
                            size="lg"
                          >
                            Confirmar Pedido
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card.Content>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Processing */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="animate-spin w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Procesando tu pedido...
                </h2>
                <p className="text-gray-600">
                  Por favor espera mientras confirmamos tu compra
                </p>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <Card.Header>
                  <h3 className="text-lg font-semibold">Resumen del Pedido</h3>
                </Card.Header>
                <Card.Content className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Coupon */}
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Código de cupón"
                        leftIcon={<Tag className="w-4 h-4 text-gray-400" />}
                        disabled={!!appliedCoupon}
                      />
                      {!appliedCoupon ? (
                        <Button
                          onClick={applyCoupon}
                          variant="outline"
                          disabled={!couponCode}
                        >
                          Aplicar
                        </Button>
                      ) : (
                        <Button onClick={removeCoupon} variant="outline">
                          Quitar
                        </Button>
                      )}
                    </div>
                    {appliedCoupon && (
                      <Badge variant="success" className="text-xs">
                        {appliedCoupon.description} aplicado
                      </Badge>
                    )}
                  </div>

                  <hr />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>
                        {shipping === 0 ? (
                          <Badge variant="success" size="sm">Gratis</Badge>
                        ) : (
                          `$${shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento:</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>
                    )}
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
