import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

// Validation schema
const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  phone: z
    .string()
    .min(1, 'El teléfono es requerido')
    .regex(/^[+]?[\d\s-()]+$/, 'Ingresa un número de teléfono válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Debes aceptar los términos y condiciones'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading, error, showLoginModal } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    const { confirmPassword, acceptTerms, ...userData } = data;
    const result = await registerUser(userData);
    if (result.success) {
      reset();
    }
  };

  const switchToLogin = () => {
    reset();
    showLoginModal();
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Muy débil', color: 'bg-red-500' },
      { strength: 2, label: 'Débil', color: 'bg-orange-500' },
      { strength: 3, label: 'Regular', color: 'bg-yellow-500' },
      { strength: 4, label: 'Fuerte', color: 'bg-green-500' },
      { strength: 5, label: 'Muy fuerte', color: 'bg-green-600' },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Crear Cuenta
        </h2>
        <p className="text-gray-600">
          Únete a nuestra comunidad
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <Input
            {...register('name')}
            type="text"
            label="Nombre Completo"
            placeholder="Juan Pérez"
            error={errors.name?.message}
            leftIcon={<User className="w-4 h-4 text-gray-400" />}
            autoComplete="name"
          />
        </div>

        {/* Email Field */}
        <div>
          <Input
            {...register('email')}
            type="email"
            label="Correo Electrónico"
            placeholder="tu@email.com"
            error={errors.email?.message}
            leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
            autoComplete="email"
          />
        </div>

        {/* Phone Field */}
        <div>
          <Input
            {...register('phone')}
            type="tel"
            label="Teléfono"
            placeholder="+57 300 123 4567"
            error={errors.phone?.message}
            leftIcon={<Phone className="w-4 h-4 text-gray-400" />}
            autoComplete="tel"
          />
        </div>

        {/* Password Field */}
        <div>
          <Input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            placeholder="••••••••"
            error={errors.password?.message}
            leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            autoComplete="new-password"
          />
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{passwordStrength.label}</span>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-2">
                  {password.length >= 8 ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full" />
                  )}
                  <span>Al menos 8 caracteres</span>
                </div>
                <div className="flex items-center gap-2">
                  {/[A-Z]/.test(password) ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full" />
                  )}
                  <span>Una letra mayúscula</span>
                </div>
                <div className="flex items-center gap-2">
                  {/[a-z]/.test(password) ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full" />
                  )}
                  <span>Una letra minúscula</span>
                </div>
                <div className="flex items-center gap-2">
                  {/\d/.test(password) ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <div className="w-3 h-3 border border-gray-300 rounded-full" />
                  )}
                  <span>Un número</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <Input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmar Contraseña"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            autoComplete="new-password"
          />
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start gap-3">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
            />
            <span className="text-sm text-gray-600">
              Acepto los{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                términos y condiciones
              </button>{' '}
              y la{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                política de privacidad
              </button>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting || loading}
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>

      {/* Switch to Login */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
