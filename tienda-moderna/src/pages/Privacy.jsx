import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';

const Privacy = () => {
  const lastUpdated = '15 de enero de 2024';

  const sections = [
    {
      id: 'introduction',
      title: '1. Introducción',
      icon: Shield,
      content: `En Tienda Moderna, respetamos su privacidad y nos comprometemos a proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información cuando utiliza nuestro sitio web y servicios.

Al utilizar nuestros servicios, usted acepta las prácticas descritas en esta política.`
    },
    {
      id: 'information',
      title: '2. Información que Recopilamos',
      icon: Database,
      content: `Recopilamos diferentes tipos de información:

Información Personal:
• Nombre completo
• Dirección de correo electrónico
• Número de teléfono
• Dirección de envío y facturación
• Información de pago (procesada de forma segura)

Información de Uso:
• Páginas visitadas en nuestro sitio web
• Productos visualizados y comprados
• Tiempo de navegación
• Dirección IP y ubicación aproximada
• Tipo de dispositivo y navegador

Información de Cookies:
• Preferencias del sitio web
• Historial de navegación
• Información de sesión`
    },
    {
      id: 'use',
      title: '3. Cómo Utilizamos su Información',
      icon: Eye,
      content: `Utilizamos su información para:

Procesamiento de Pedidos:
• Procesar y completar sus compras
• Enviar confirmaciones y actualizaciones de pedidos
• Gestionar devoluciones y reembolsos

Comunicación:
• Responder a sus consultas y solicitudes
• Enviar newsletters y ofertas promocionales (con su consentimiento)
• Notificar sobre cambios en nuestros servicios

Mejora del Servicio:
• Personalizar su experiencia de compra
• Analizar tendencias de uso
• Mejorar nuestro sitio web y productos
• Prevenir fraudes y actividades maliciosas`
    },
    {
      id: 'sharing',
      title: '4. Compartir Información',
      icon: Lock,
      content: `No vendemos su información personal a terceros. Podemos compartir información limitada con:

Proveedores de Servicios:
• Procesadores de pagos (para transacciones seguras)
• Empresas de envío (para entregar pedidos)
• Proveedores de servicios de email (para comunicaciones)
• Servicios de análisis web (datos anonimizados)

Requisitos Legales:
• Cuando sea requerido por ley
• Para proteger nuestros derechos legales
• En caso de investigaciones de fraude
• Para cumplir con órdenes judiciales

Todos nuestros socios están obligados contractualmente a proteger su información.`
    },
    {
      id: 'cookies',
      title: '5. Cookies y Tecnologías Similares',
      icon: Database,
      content: `Utilizamos cookies para mejorar su experiencia:

Tipos de Cookies:
• Cookies esenciales (necesarias para el funcionamiento del sitio)
• Cookies de rendimiento (para analizar el uso del sitio)
• Cookies de funcionalidad (para recordar sus preferencias)
• Cookies de marketing (para mostrar anuncios relevantes)

Control de Cookies:
• Puede configurar su navegador para rechazar cookies
• Puede eliminar cookies existentes en cualquier momento
• Algunas funciones del sitio pueden no funcionar sin cookies

Para más información, consulte nuestra Política de Cookies.`
    },
    {
      id: 'security',
      title: '6. Seguridad de la Información',
      icon: Shield,
      content: `Implementamos medidas de seguridad robustas:

Medidas Técnicas:
• Encriptación SSL/TLS para todas las transmisiones
• Servidores seguros con acceso restringido
• Firewalls y sistemas de detección de intrusiones
• Copias de seguridad regulares y cifradas

Medidas Organizacionales:
• Acceso limitado a información personal
• Capacitación regular del personal en seguridad
• Políticas estrictas de manejo de datos
• Auditorías de seguridad periódicas

Sin embargo, ningún sistema es 100% seguro. Le recomendamos usar contraseñas fuertes y mantener su información de cuenta segura.`
    },
    {
      id: 'rights',
      title: '7. Sus Derechos',
      icon: Eye,
      content: `Usted tiene los siguientes derechos sobre su información personal:

Acceso: Solicitar una copia de la información que tenemos sobre usted
Rectificación: Corregir información inexacta o incompleta
Eliminación: Solicitar la eliminación de su información personal
Portabilidad: Recibir sus datos en un formato estructurado
Oposición: Oponerse al procesamiento de sus datos para ciertos fines
Restricción: Limitar cómo procesamos su información

Para ejercer estos derechos, contáctenos en privacy@tiendamoderna.com`
    },
    {
      id: 'retention',
      title: '8. Retención de Datos',
      icon: Database,
      content: `Conservamos su información personal durante el tiempo necesario para:

• Cumplir con los fines para los que fue recopilada
• Cumplir con obligaciones legales y regulatorias
• Resolver disputas y hacer cumplir nuestros acuerdos
• Mantener registros de transacciones según lo requerido por ley

Períodos de Retención Típicos:
• Información de cuenta: Mientras su cuenta esté activa
• Historial de pedidos: 7 años para fines fiscales
• Datos de marketing: Hasta que retire su consentimiento
• Logs del servidor: 12 meses`
    },
    {
      id: 'international',
      title: '9. Transferencias Internacionales',
      icon: Lock,
      content: `Sus datos pueden ser transferidos y procesados en países fuera de Colombia:

• Utilizamos proveedores de servicios internacionales confiables
• Implementamos salvaguardas apropiadas para proteger sus datos
• Cumplimos con regulaciones internacionales de protección de datos
• Sus datos están protegidos por contratos de transferencia de datos

Si tiene preguntas sobre transferencias de datos, contáctenos.`
    },
    {
      id: 'children',
      title: '10. Privacidad de Menores',
      icon: Shield,
      content: `Nuestros servicios no están dirigidos a menores de 18 años:

• No recopilamos intencionalmente información de menores
• Si descubrimos que hemos recopilado información de un menor, la eliminaremos
• Los padres pueden contactarnos para revisar o eliminar información de sus hijos
• Requerimos verificación de edad para ciertas funciones`
    },
    {
      id: 'changes',
      title: '11. Cambios a esta Política',
      icon: Eye,
      content: `Podemos actualizar esta Política de Privacidad ocasionalmente:

• Le notificaremos sobre cambios significativos por email
• Los cambios menores se publicarán en nuestro sitio web
• Su uso continuado de nuestros servicios constituye aceptación de los cambios
• Siempre puede revisar la versión más reciente en nuestro sitio web`
    },
    {
      id: 'contact',
      title: '12. Contacto',
      icon: Lock,
      content: `Para preguntas sobre esta Política de Privacidad o sus datos personales:

Email: privacy@tiendamoderna.com
Teléfono: +57 300 123 4567
Dirección: Calle 123 #45-67, Bogotá, Colombia

Oficial de Protección de Datos:
Email: dpo@tiendamoderna.com

Responderemos a su consulta dentro de 30 días.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Política de Privacidad
              </h1>
              <p className="text-gray-600 mt-2">
                Última actualización: {lastUpdated}
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">
                  Su Privacidad es Nuestra Prioridad
                </h3>
                <p className="text-green-800 text-sm">
                  Nos comprometemos a proteger su información personal y ser transparentes 
                  sobre cómo la utilizamos. Esta política explica nuestras prácticas de privacidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="card sticky top-24">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Índice
                </h2>
              </div>
              <div className="card-content">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors py-1"
                    >
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="card">
                    <div className="card-content">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <section.icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {section.title}
                        </h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Card className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <div className="card-content text-center">
                  <Lock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ¿Preguntas sobre su Privacidad?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nuestro equipo de privacidad está disponible para responder cualquier pregunta 
                    sobre cómo manejamos su información personal.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="btn btn-primary">
                      <a href="mailto:privacy@tiendamoderna.com">
                        Contactar Equipo de Privacidad
                      </a>
                    </Button>
                    <Link to="/contact">
                      <Button variant="outline" className="btn btn-outline">
                        Centro de Contacto
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
