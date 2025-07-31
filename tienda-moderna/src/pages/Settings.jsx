import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Monitor,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Download,
  Upload,
  Key,
  CreditCard,
  MapPin,
  Languages,
  Palette,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirma la nueva contraseña'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const Settings = () => {
  const { user, isAuthenticated, showLoginModal } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'es',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
      orders: true,
      offers: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      dataCollection: true,
      analytics: true
    },
    preferences: {
      currency: 'COP',
      timezone: 'America/Bogota',
      soundEnabled: true,
      autoSave: true,
      compactView: false
    }
  });

  // Forms
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para acceder a configuración
          </h2>
          <p className="text-gray-600 mb-8">
            Necesitas una cuenta para personalizar tu experiencia y gestionar tus preferencias.
          </p>
          <Button onClick={showLoginModal} className="btn btn-primary">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
    { id: 'preferences', name: 'Preferencias', icon: Globe },
    { id: 'security', name: 'Seguridad', icon: Key },
  ];

  const onProfileSubmit = async (data) => {
    try {
      // Update profile logic
      console.log('Profile updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      // Update password logic
      console.log('Password updated');
      passwordForm.reset();
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const exportData = () => {
    const dataToExport = {
      profile: user,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tienda-moderna-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Información Personal</h3>
                <p className="text-gray-600">Actualiza tu información básica</p>
              </div>
              <div className="card-content">
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
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
                    type="tel"
                    label="Teléfono (Opcional)"
                    error={profileForm.formState.errors.phone?.message}
                    leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
                    className="input"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" className="btn btn-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              </div>
            </Card>

            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Foto de Perfil</h3>
                <p className="text-gray-600">Personaliza tu avatar</p>
              </div>
              <div className="card-content">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-2xl">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="btn btn-outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Foto
                    </Button>
                    <Button variant="ghost" className="btn btn-ghost text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Preferencias de Notificación</h3>
                <p className="text-gray-600">Controla cómo y cuándo recibes notificaciones</p>
              </div>
              <div className="card-content space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Canales de Notificación</h4>
                  {[
                    { key: 'email', label: 'Correo Electrónico', icon: Mail },
                    { key: 'push', label: 'Notificaciones Push', icon: Bell },
                    { key: 'sms', label: 'Mensajes SMS', icon: Phone },
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[key]}
                          onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Tipos de Notificación</h4>
                  {[
                    { key: 'orders', label: 'Actualizaciones de Pedidos' },
                    { key: 'offers', label: 'Ofertas y Promociones' },
                    { key: 'marketing', label: 'Contenido de Marketing' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-900">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[key]}
                          onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Configuración de Privacidad</h3>
                <p className="text-gray-600">Controla la visibilidad de tu información</p>
              </div>
              <div className="card-content space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Visibilidad del Perfil</h4>
                  {[
                    { key: 'profileVisible', label: 'Perfil público visible' },
                    { key: 'showEmail', label: 'Mostrar correo electrónico' },
                    { key: 'showPhone', label: 'Mostrar número de teléfono' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-900">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacy[key]}
                          onChange={(e) => updateSetting('privacy', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Recopilación de Datos</h4>
                  {[
                    { key: 'dataCollection', label: 'Permitir recopilación de datos para mejorar el servicio' },
                    { key: 'analytics', label: 'Permitir análisis de uso anónimo' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-900">{label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.privacy[key]}
                          onChange={(e) => updateSetting('privacy', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Gestión de Datos</h3>
                <p className="text-gray-600">Exporta o elimina tus datos</p>
              </div>
              <div className="card-content">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={exportData} variant="outline" className="btn btn-outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Mis Datos
                  </Button>
                  <Button variant="outline" className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Solicitar Eliminación
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Preferencias de Aplicación</h3>
                <p className="text-gray-600">Personaliza tu experiencia</p>
              </div>
              <div className="card-content space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Tema
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => updateSetting('preferences', 'theme', e.target.value)}
                    className="input"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="system">Sistema</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Languages className="w-4 h-4 inline mr-2" />
                    Idioma
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                    className="input"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moneda
                  </label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => updateSetting('preferences', 'currency', e.target.value)}
                    className="input"
                  >
                    <option value="COP">Peso Colombiano (COP)</option>
                    <option value="USD">Dólar Americano (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Otras Preferencias</h4>
                  {[
                    { key: 'soundEnabled', label: 'Sonidos habilitados', icon: Volume2 },
                    { key: 'autoSave', label: 'Guardado automático', icon: Save },
                    { key: 'compactView', label: 'Vista compacta', icon: Monitor },
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.preferences[key]}
                          onChange={(e) => updateSetting('preferences', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Cambiar Contraseña</h3>
                <p className="text-gray-600">Actualiza tu contraseña para mantener tu cuenta segura</p>
              </div>
              <div className="card-content">
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <div className="relative">
                    <Input
                      {...passwordForm.register('currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                      label="Contraseña Actual"
                      error={passwordForm.formState.errors.currentPassword?.message}
                      leftIcon={<Key className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      {...passwordForm.register('newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      label="Nueva Contraseña"
                      error={passwordForm.formState.errors.newPassword?.message}
                      leftIcon={<Key className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      {...passwordForm.register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirmar Nueva Contraseña"
                      error={passwordForm.formState.errors.confirmPassword?.message}
                      leftIcon={<Key className="w-4 h-4 text-gray-400" />}
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="btn btn-primary">
                      <Save className="w-4 h-4 mr-2" />
                      Actualizar Contraseña
                    </Button>
                  </div>
                </form>
              </div>
            </Card>

            <Card className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Sesiones Activas</h3>
                <p className="text-gray-600">Gestiona dónde has iniciado sesión</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">Navegador Actual</p>
                        <p className="text-sm text-gray-500">Chrome en Windows • Bogotá, Colombia</p>
                      </div>
                    </div>
                    <Badge variant="success" className="badge badge-success">Activa</Badge>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50">
                      Cerrar Todas las Sesiones
                    </Button>
                  </div>
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
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Configuración
              </h1>
              <p className="text-gray-600">
                Personaliza tu experiencia y gestiona tu cuenta
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card sticky top-24">
              <div className="card-content p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
