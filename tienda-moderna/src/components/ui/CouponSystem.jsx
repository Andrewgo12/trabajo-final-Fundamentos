import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';

const CouponSystem = ({ cartTotal, onCouponApplied }) => {
  const { showSuccess, showError, showInfo } = useNotification();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  // Cupones predefinidos
  const coupons = [
    {
      code: 'CLEANPRO10',
      discount: 10,
      type: 'percentage',
      minAmount: 30000,
      description: '10% de descuento en compras superiores a $30.000',
      emoji: '🎉'
    },
    {
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      minAmount: 50000,
      description: '20% de descuento para nuevos clientes (mín. $50.000)',
      emoji: '👋'
    },
    {
      code: 'SAVE5000',
      discount: 5000,
      type: 'fixed',
      minAmount: 25000,
      description: '$5.000 de descuento en compras superiores a $25.000',
      emoji: '💰'
    },
    {
      code: 'FREESHIP',
      discount: 5000,
      type: 'shipping',
      minAmount: 0,
      description: 'Envío gratis en cualquier compra',
      emoji: '🚚'
    },
    {
      code: 'MEGA30',
      discount: 30,
      type: 'percentage',
      minAmount: 100000,
      description: '30% de descuento en compras superiores a $100.000',
      emoji: '🔥'
    }
  ];

  useEffect(() => {
    // Filtrar cupones disponibles según el total del carrito
    const available = coupons.filter(coupon => cartTotal >= coupon.minAmount);
    setAvailableCoupons(available);
  }, [cartTotal]);

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      showError('Por favor ingresa un código de cupón');
      return;
    }

    setLoading(true);

    try {
      // Simular validación del cupón
      await new Promise(resolve => setTimeout(resolve, 1000));

      const coupon = coupons.find(c => 
        c.code.toLowerCase() === couponCode.toLowerCase().trim()
      );

      if (!coupon) {
        showError('Código de cupón inválido');
        setLoading(false);
        return;
      }

      if (cartTotal < coupon.minAmount) {
        showError(`Este cupón requiere una compra mínima de $${coupon.minAmount.toLocaleString()}`);
        setLoading(false);
        return;
      }

      // Calcular descuento
      let discountAmount = 0;
      if (coupon.type === 'percentage') {
        discountAmount = (cartTotal * coupon.discount) / 100;
      } else if (coupon.type === 'fixed') {
        discountAmount = coupon.discount;
      } else if (coupon.type === 'shipping') {
        discountAmount = coupon.discount; // Para envío gratis
      }

      const appliedCouponData = {
        ...coupon,
        discountAmount: Math.min(discountAmount, cartTotal) // No puede ser mayor al total
      };

      setAppliedCoupon(appliedCouponData);
      setCouponCode('');
      onCouponApplied(appliedCouponData);
      
      showSuccess(`${coupon.emoji} Cupón aplicado: ${coupon.description}`, 4000);
    } catch (error) {
      showError('Error al aplicar el cupón');
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    onCouponApplied(null);
    showInfo('Cupón removido', 2000);
  };

  const applySuggestedCoupon = (coupon) => {
    setCouponCode(coupon.code);
    applyCoupon();
  };

  return (
    <div style={{
      background: 'var(--white)',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-color)',
      marginBottom: '1rem'
    }}>
      <h4 style={{ 
        fontSize: '1.125rem', 
        fontWeight: '600', 
        marginBottom: '1rem',
        color: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🎫 Cupones de Descuento
      </h4>

      {/* Applied Coupon */}
      {appliedCoupon && (
        <div style={{
          background: 'linear-gradient(135deg, var(--success-light) 0%, #dcfce7 100%)',
          border: '2px solid var(--success-color)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '1.25rem' }}>{appliedCoupon.emoji}</span>
              <strong style={{ color: 'var(--success-color)' }}>
                {appliedCoupon.code}
              </strong>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: 'var(--success-color)',
              fontWeight: '500'
            }}>
              Descuento: ${appliedCoupon.discountAmount.toLocaleString()}
            </p>
          </div>
          <button
            onClick={removeCoupon}
            style={{
              background: 'var(--danger-color)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Coupon Input */}
      {!appliedCoupon && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Ingresa código de cupón"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '2px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                textTransform: 'uppercase'
              }}
              onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
            />
            <button
              onClick={applyCoupon}
              disabled={loading || !couponCode.trim()}
              style={{
                background: loading || !couponCode.trim() 
                  ? 'var(--medium-gray)' 
                  : 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: loading || !couponCode.trim() ? 'not-allowed' : 'pointer',
                minWidth: '100px'
              }}
            >
              {loading ? '⏳' : 'Aplicar'}
            </button>
          </div>
        </div>
      )}

      {/* Available Coupons */}
      {!appliedCoupon && availableCoupons.length > 0 && (
        <div>
          <h5 style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            marginBottom: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            💡 Cupones disponibles para ti:
          </h5>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {availableCoupons.slice(0, 3).map(coupon => (
              <div
                key={coupon.code}
                style={{
                  background: 'var(--light-gray)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--light-gray)'}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span>{coupon.emoji}</span>
                    <strong style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>
                      {coupon.code}
                    </strong>
                  </div>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.75rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.4
                  }}>
                    {coupon.description}
                  </p>
                </div>
                <button
                  onClick={() => applySuggestedCoupon(coupon)}
                  style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginLeft: '0.5rem'
                  }}
                >
                  Usar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Available Coupons */}
      {!appliedCoupon && availableCoupons.length === 0 && cartTotal > 0 && (
        <div style={{
          background: 'var(--warning-light)',
          border: '1px solid var(--warning-color)',
          borderRadius: '6px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛍️</div>
          <p style={{ 
            margin: 0, 
            fontSize: '0.875rem', 
            color: 'var(--warning-color)',
            fontWeight: '500'
          }}>
            Agrega más productos para desbloquear cupones de descuento
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponSystem;
