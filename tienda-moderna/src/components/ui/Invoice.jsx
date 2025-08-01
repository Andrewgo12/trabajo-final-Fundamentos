import React, { useState } from 'react';
import OrderTracking from './OrderTracking';

const Invoice = ({ orderData, onClose }) => {
  const [showTracking, setShowTracking] = useState(false);
  const {
    orderNumber,
    date,
    customer,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod
  } = orderData;

  const printInvoice = () => {
    window.print();
  };

  const downloadPDF = () => {
    // Simular descarga de PDF
    const element = document.createElement('a');
    const file = new Blob([generatePDFContent()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `factura-${orderNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDFContent = () => {
    return `
FACTURA ELECTRÓNICA - CLEANPRO
===============================

Número de Orden: ${orderNumber}
Fecha: ${date}

DATOS DEL CLIENTE:
------------------
Nombre: ${customer.name}
Email: ${customer.email}
Teléfono: ${customer.phone}
Dirección: ${customer.address}

PRODUCTOS:
----------
${items.map(item => 
  `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`
).join('\n')}

RESUMEN:
--------
Subtotal: $${subtotal.toLocaleString()}
Envío: $${shipping.toLocaleString()}
TOTAL: $${total.toLocaleString()}

Método de Pago: ${paymentMethod}

¡Gracias por tu compra en CleanPro!
    `;
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
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '800px',
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
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: 'var(--primary-color)',
              margin: 0
            }}>
              📄 FACTURA ELECTRÓNICA
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>
              CleanPro - Productos de Aseo Profesional
            </p>
          </div>
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
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Order Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              📋 Información del Pedido
            </h3>
            <p><strong>Número:</strong> #{orderNumber}</p>
            <p><strong>Fecha:</strong> {date}</p>
            <p><strong>Estado:</strong> <span style={{ color: 'var(--success-color)' }}>✅ Pagado</span></p>
          </div>
          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              👤 Datos del Cliente
            </h3>
            <p><strong>Nombre:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Teléfono:</strong> {customer.phone}</p>
            <p><strong>Dirección:</strong> {customer.address}</p>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
            🛍️ Productos Comprados
          </h3>
          <div style={{
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--light-gray)',
              fontWeight: '600'
            }}>
              <div>Producto</div>
              <div>Precio</div>
              <div>Cantidad</div>
              <div>Total</div>
            </div>
            {items.map((item, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <div>{item.name}</div>
                <div>${item.price.toLocaleString()}</div>
                <div>{item.quantity}</div>
                <div style={{ fontWeight: '600' }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{
          backgroundColor: 'var(--light-gray)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Envío:</span>
            <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}</span>
          </div>
          <hr style={{ margin: '1rem 0' }} />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--primary-color)'
          }}>
            <span>TOTAL:</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>Método de Pago:</strong> {paymentMethod}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setShowTracking(true)}
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            📍 Rastrear Pedido
          </button>
          <button
            onClick={printInvoice}
            style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            🖨️ Imprimir Factura
          </button>
          <button
            onClick={downloadPDF}
            style={{
              background: 'var(--success-color)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            📄 Descargar PDF
          </button>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <p>¡Gracias por tu compra en CleanPro!</p>
          <p>Para soporte contacta: soporte@cleanpro.com | +57 300 123 4567</p>
        </div>
      </div>

      {/* Order Tracking Modal */}
      {showTracking && (
        <OrderTracking
          orderNumber={orderNumber}
          onClose={() => setShowTracking(false)}
        />
      )}
    </div>
  );
};

export default Invoice;
