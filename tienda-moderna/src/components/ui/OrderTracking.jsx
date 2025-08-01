import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';

const OrderTracking = ({ orderNumber, onClose }) => {
  const { showSuccess, showError } = useNotification();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      loadTrackingData();
    }
  }, [orderNumber]);

  const loadTrackingData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos de tracking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generar datos de tracking simulados
      const mockTrackingData = generateMockTracking(orderNumber);
      setTrackingData(mockTrackingData);
    } catch (error) {
      showError('Error al cargar información de seguimiento');
    } finally {
      setLoading(false);
    }
  };

  const generateMockTracking = (orderNum) => {
    const now = new Date();
    const statuses = [
      {
        status: 'Pedido Confirmado',
        description: 'Tu pedido ha sido confirmado y está siendo preparado',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 horas atrás
        completed: true,
        icon: '✅'
      },
      {
        status: 'En Preparación',
        description: 'Estamos empacando tus productos con cuidado',
        timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hora atrás
        completed: true,
        icon: '📦'
      },
      {
        status: 'En Camino',
        description: 'Tu pedido está en camino hacia tu dirección',
        timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 min atrás
        completed: true,
        icon: '🚚'
      },
      {
        status: 'Entregado',
        description: 'Tu pedido ha sido entregado exitosamente',
        timestamp: new Date(now.getTime() + 2 * 60 * 60 * 1000), // En 2 horas
        completed: false,
        icon: '🎉'
      }
    ];

    return {
      orderNumber: orderNum,
      currentStatus: 'En Camino',
      estimatedDelivery: new Date(now.getTime() + 4 * 60 * 60 * 1000),
      carrier: 'CleanPro Express',
      trackingNumber: `CP${orderNum.slice(-6)}TR`,
      statuses: statuses,
      deliveryAddress: 'Calle 123 #45-67, Bogotá, Colombia',
      contact: {
        phone: '+57 300 123 4567',
        email: 'soporte@cleanpro.com'
      }
    };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyTrackingNumber = () => {
    if (trackingData?.trackingNumber) {
      navigator.clipboard.writeText(trackingData.trackingNumber);
      showSuccess('Número de seguimiento copiado', 2000);
    }
  };

  if (loading) {
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
        zIndex: 10000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h3 style={{ marginBottom: '1rem' }}>Cargando seguimiento...</h3>
          <div style={{
            width: '200px',
            height: '4px',
            backgroundColor: 'var(--light-gray)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <div style={{
              width: '50%',
              height: '100%',
              backgroundColor: 'var(--primary-color)',
              animation: 'loading 1.5s ease-in-out infinite'
            }} />
          </div>
          <style>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

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
        maxWidth: '700px',
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
            📍 Seguimiento de Pedido
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'var(--danger-color)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        {trackingData && (
          <>
            {/* Order Info */}
            <div style={{
              background: 'var(--light-gray)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                    📦 Información del Pedido
                  </h4>
                  <p><strong>Número:</strong> {trackingData.orderNumber}</p>
                  <p><strong>Estado:</strong> <span style={{ color: 'var(--primary-color)' }}>{trackingData.currentStatus}</span></p>
                  <p><strong>Transportadora:</strong> {trackingData.carrier}</p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                    🚚 Información de Envío
                  </h4>
                  <p><strong>Número de seguimiento:</strong></p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <code style={{
                      background: 'var(--white)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {trackingData.trackingNumber}
                    </code>
                    <button
                      onClick={copyTrackingNumber}
                      style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      📋
                    </button>
                  </div>
                  <p><strong>Entrega estimada:</strong> {formatDate(trackingData.estimatedDelivery)}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
                📍 Dirección de Entrega
              </h4>
              <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                {trackingData.deliveryAddress}
              </p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span>📞 {trackingData.contact.phone}</span>
                <span>✉️ {trackingData.contact.email}</span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                📋 Historial de Seguimiento
              </h4>
              <div style={{ position: 'relative' }}>
                {/* Timeline Line */}
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '20px',
                  bottom: '20px',
                  width: '2px',
                  background: 'var(--border-color)'
                }} />

                {trackingData.statuses.map((status, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '2rem',
                    position: 'relative'
                  }}>
                    {/* Timeline Dot */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: status.completed 
                        ? 'linear-gradient(135deg, var(--success-color) 0%, #10b981 100%)'
                        : 'var(--light-gray)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      marginRight: '1rem',
                      border: status.completed ? 'none' : '2px solid var(--border-color)',
                      zIndex: 1,
                      position: 'relative'
                    }}>
                      {status.completed ? '✓' : status.icon}
                    </div>

                    {/* Status Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        background: status.completed ? 'var(--success-light)' : 'var(--light-gray)',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: status.completed ? '1px solid var(--success-color)' : '1px solid var(--border-color)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h5 style={{
                            margin: 0,
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: status.completed ? 'var(--success-color)' : 'var(--text-primary)'
                          }}>
                            {status.status}
                          </h5>
                          <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            fontWeight: '500'
                          }}>
                            {status.completed ? formatDate(status.timestamp) : 'Pendiente'}
                          </span>
                        </div>
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4
                        }}>
                          {status.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => window.open(`https://wa.me/573001234567?text=Hola, necesito ayuda con mi pedido ${trackingData.orderNumber}`, '_blank')}
                style={{
                  background: '#25d366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                💬 Contactar por WhatsApp
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'var(--light-gray)',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
