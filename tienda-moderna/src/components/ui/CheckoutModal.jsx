import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';

const CheckoutModal = ({ cartItems, total, onClose, onSuccess }) => {
  const { showSuccess, showError, showLoading, dismissToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'credit-card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'address', 'city'];
    for (let field of required) {
      if (!formData[field].trim()) {
        showError(`El campo ${field} es obligatorio`);
        return false;
      }
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Por favor ingresa un email válido');
      return false;
    }
    
    return true;
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    const loadingToast = showLoading('Procesando pago...');

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      dismissToast(loadingToast);
      
      const orderData = {
        orderNumber: `CP-${Date.now()}`,
        date: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}`
        },
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: total - (total >= 50000 ? 0 : 5000),
        shipping: total >= 50000 ? 0 : 5000,
        total: total,
        paymentMethod: formData.paymentMethod === 'credit-card' ? 'Tarjeta de Crédito' : 
                      formData.paymentMethod === 'debit-card' ? 'Tarjeta Débito' :
                      formData.paymentMethod === 'pse' ? 'PSE' : 'Efectivo'
      };

      showSuccess('¡Pago procesado exitosamente!', 4000);
      onSuccess(orderData);
      
    } catch (error) {
      dismissToast(loadingToast);
      showError('Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid var(--primary-color)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: 'var(--primary-color)',
            margin: 0
          }}>
            💳 Finalizar Compra
          </h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            style={{
              background: 'var(--danger-color)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.5 : 1
            }}
          >
            ×
          </button>
        </div>

        {/* Order Summary */}
        <div style={{
          backgroundColor: 'var(--light-gray)',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
            📋 Resumen del Pedido
          </h3>
          <div style={{ fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos</span>
              <span>${(total - (total >= 50000 ? 0 : 5000)).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Envío</span>
              <span>{total >= 50000 ? 'Gratis' : '$5.000'}</span>
            </div>
            <hr style={{ margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1rem' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary-color)' }}>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); processPayment(); }}>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Ciudad *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Dirección Completa *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={isProcessing}
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Método de Pago
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="credit-card">💳 Tarjeta de Crédito</option>
                <option value="debit-card">💳 Tarjeta Débito</option>
                <option value="pse">🏦 PSE</option>
                <option value="cash">💵 Efectivo</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              style={{
                flex: 1,
                background: 'var(--light-gray)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.5 : 1
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                flex: 2,
                background: isProcessing 
                  ? 'var(--medium-gray)' 
                  : 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                boxShadow: isProcessing ? 'none' : '0 4px 15px rgba(0, 102, 255, 0.3)'
              }}
            >
              {isProcessing ? '⏳ Procesando...' : '💳 Pagar Ahora'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
