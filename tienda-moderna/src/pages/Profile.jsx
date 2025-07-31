import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Plus,
  Trash2,
  Shield,
  Bell,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';

// Validation schema
const profileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
});

const addressSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  street: z.string().min(1, 'La dirección es requerida'),
  city: z.string().min(1, 'La ciudad es requerida'),
  state: z.string().min(1, 'El departamento es requerido'),
  zipCode: z.string().min(1, 'El código postal es requerido'),
});

const Profile = () => {
  const { user, isAuthenticated, showLoginModal, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Casa',
      street: 'Calle 123 #45-67',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zipCode: '110111',
      isDefault: true
    }
  ]);

  // Profile form
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  // Address form
  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tu perfil
          </h2>
          <p className="text-gray-600 mb-8">
            Accede a tu cuenta para gestionar tu información personal y preferencias.
          </p>
          <Button onClick={showLoginModal} className="btn btn-primary">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const onProfileSubmit = async (data) => {
    try {
      await updateUser(data);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const onAddressSubmit = (data) => {
    const newAddress = {
      id: Date.now(),
      ...data,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddress]);
    addressForm.reset();
    setShowAddAddress(false);
  };

  const deleteAddress = (addressId) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };

  const setDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Mi Cuenta' }
          ]} />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-2xl">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Mi Perfil
              </h1>
              <p className="text-gray-600">
                Gestiona tu información personal y preferencias
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información Personal
                  </h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="btn btn-outline"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        size="sm"
                        className="btn btn-outline"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={profileForm.handleSubmit(onProfileSubmit)}
                        size="sm"
                        className="btn btn-primary"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-content">
                {isEditing ? (
                  <form className="space-y-4">
                    <Input
                      {...profileForm.register('name')}
                      label="Nombre Completo"
                      error={profileForm.formState.errors.name?.message}
                      leftIcon={<User className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                    <Input
                      {...profileForm.register('email')}
                      type="email"
                      label="Correo Electrónico"
                      error={profileForm.formState.errors.email?.message}
                      leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                    <Input
                      {...profileForm.register('phone')}
                      label="Teléfono"
                      error={profileForm.formState.errors.phone?.message}
                      leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">Nombre completo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{user?.email}</p>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{user?.phone || 'No especificado'}</p>
                        <p className="text-sm text-gray-500">Teléfono</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Addresses */}
            <Card className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Direcciones de Envío
                  </h2>
                  <Button
                    onClick={() => setShowAddAddress(true)}
                    size="sm"
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
              <div className="card-content">
                {showAddAddress && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 mb-4">Nueva Dirección</h3>
                    <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                      <Input
                        {...addressForm.register('name')}
                        label="Nombre de la dirección"
                        placeholder="Casa, Oficina, etc."
                        error={addressForm.formState.errors.name?.message}
                        className="input"
                      />
                      <Input
                        {...addressForm.register('street')}
                        label="Dirección"
                        placeholder="Calle 123 #45-67"
                        error={addressForm.formState.errors.street?.message}
                        className="input"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          {...addressForm.register('city')}
                          label="Ciudad"
                          error={addressForm.formState.errors.city?.message}
                          className="input"
                        />
                        <Input
                          {...addressForm.register('state')}
                          label="Departamento"
                          error={addressForm.formState.errors.state?.message}
                          className="input"
                        />
                        <Input
                          {...addressForm.register('zipCode')}
                          label="Código Postal"
                          error={addressForm.formState.errors.zipCode?.message}
                          className="input"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" size="sm" className="btn btn-primary">
                          Guardar Dirección
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          variant="outline"
                          size="sm"
                          className="btn btn-outline"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{address.name}</h3>
                            {address.isDefault && (
                              <Badge variant="primary" size="sm" className="badge badge-primary">
                                Por defecto
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">
                            {address.street}<br />
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <Button
                              onClick={() => setDefaultAddress(address.id)}
                              variant="outline"
                              size="sm"
                              className="btn btn-outline text-xs"
                            >
                              Predeterminada
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteAddress(address.id)}
                            variant="outline"
                            size="sm"
                            className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Estadísticas de Cuenta</h3>
              </div>
              <div className="card-content space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pedidos realizados</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Productos favoritos</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Miembro desde</span>
                  <span className="font-semibold">Enero 2024</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Acciones Rápidas</h3>
              </div>
              <div className="card-content space-y-3">
                <Button variant="outline" className="w-full btn btn-outline justify-start">
                  <Shield className="w-4 h-4 mr-3" />
                  Cambiar Contraseña
                </Button>
                <Button variant="outline" className="w-full btn btn-outline justify-start">
                  <Bell className="w-4 h-4 mr-3" />
                  Notificaciones
                </Button>
                <Button variant="outline" className="w-full btn btn-outline justify-start">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Métodos de Pago
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
