import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
        color: 'white',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fadeIn">
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '900', 
              marginBottom: '1.5rem',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}>
              📞 Contáctanos
            </h1>
            <p style={{ 
              fontSize: '1.5rem', 
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Estamos aquí para ayudarte con cualquier consulta
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Contact Info */}
            <div className="card hover-lift">
              <div className="card-body" style={{ padding: '2.5rem' }}>
                <h2 className="text-2xl font-bold title-with-line mb-6">
                  Información de Contacto
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ 
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      📞
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Teléfono</h3>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>+57 300 123 4567</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ 
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--success-color) 0%, #059669 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      ✉️
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Email</h3>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>info@cleanpro.com</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ 
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, var(--warning-color) 0%, #f59e0b 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}>
                      📍
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Dirección</h3>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Calle 123 #45-67</p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Bogotá, Colombia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card hover-lift">
              <div className="card-body" style={{ padding: '2.5rem' }}>
                <h2 className="text-2xl font-bold title-with-line mb-6">
                  Envíanos un Mensaje
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre Completo"
                      className="form-input"
                      required
                      style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)',
                        width: '100%'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="form-input"
                      required
                      style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)',
                        width: '100%'
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      className="form-input"
                      rows="5"
                      required
                      style={{
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        transition: 'var(--transition)',
                        width: '100%',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem 2rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      boxShadow: '0 4px 15px rgba(0, 102, 255, 0.3)',
                      width: '100%'
                    }}
                    className="hover-lift"
                  >
                    📤 Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
