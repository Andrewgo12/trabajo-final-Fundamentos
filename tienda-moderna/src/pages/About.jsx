import React from 'react';

const About = () => {
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
              🏢 Acerca de CleanPro
            </h1>
            <p style={{
              fontSize: '1.5rem',
              opacity: 0.95,
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Empresa líder en productos de aseo profesional
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12" style={{ backgroundColor: 'var(--light-gray)' }}>
        <div className="container">
          <div className="card hover-lift" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="card-body" style={{ padding: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div>
                  <h2 className="text-3xl font-bold title-with-line mb-6">
                    Nuestra Historia
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Fundada en 2020, CleanPro nació con la misión de revolucionar el acceso a productos de aseo profesional.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Comenzamos como una empresa familiar y hoy somos líderes en distribución nacional.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Nuestro compromiso con la calidad e innovación nos ha permitido crecer exponencialmente.
                  </p>
                </div>
                <div style={{
                  height: '300px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  🏭
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold title-with-line mb-4">
              Nuestros Valores
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
              Los principios que guían nuestro trabajo diario
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            <div className="card hover-lift text-center animate-fadeIn">
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--success-color) 0%, #059669 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  fontSize: '2rem'
                }}>
                  🏆
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Calidad</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Solo productos de las mejores marcas con estándares premium
                </p>
              </div>
            </div>

            <div className="card hover-lift text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  fontSize: '2rem'
                }}>
                  👥
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Servicio</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Equipo comprometido con la mejor experiencia de compra
                </p>
              </div>
            </div>

            <div className="card hover-lift text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  fontSize: '2rem'
                }}>
                  💎
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Confianza</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Relaciones duraderas basadas en transparencia
                </p>
              </div>
            </div>

            <div className="card hover-lift text-center animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--warning-color) 0%, #f59e0b 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  fontSize: '2rem'
                }}>
                  🚀
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient">Eficiencia</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Entrega rápida y segura en todo el territorio nacional
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Productos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Ciudades</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-200">Calificación</div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Facilitar el acceso a productos de limpieza de alta calidad a través de una plataforma 
              digital moderna, eficiente y confiable, contribuyendo al bienestar y la salud de los 
              hogares colombianos.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
