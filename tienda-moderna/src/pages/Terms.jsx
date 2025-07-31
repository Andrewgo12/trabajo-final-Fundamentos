import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import Accordion from '../components/ui/Accordion';
import Tooltip from '../components/ui/Tooltip';

const Terms = () => {
  const lastUpdated = '15 de enero de 2024';

  const sections = [
    {
      id: 'acceptance',
      title: '1. Aceptación de los Términos',
      content: `Al acceder y utilizar el sitio web de Tienda Moderna, usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.`
    },
    {
      id: 'definitions',
      title: '2. Definiciones',
      content: `En estos términos:
      • "Nosotros", "nuestro" y "nos" se refiere a Tienda Moderna.
      • "Usted" se refiere al usuario del sitio web.
      • "Productos" se refiere a todos los productos de limpieza ofrecidos en nuestro sitio web.
      • "Servicios" se refiere a todos los servicios proporcionados a través de nuestro sitio web.`
    },
    {
      id: 'use',
      title: '3. Uso del Sitio Web',
      content: `Usted puede utilizar nuestro sitio web para:
      • Navegar y buscar productos
      • Realizar compras de productos
      • Crear y gestionar su cuenta de usuario
      • Acceder a información sobre productos y servicios
      
      No puede utilizar nuestro sitio web para:
      • Actividades ilegales o no autorizadas
      • Transmitir virus o código malicioso
      • Intentar obtener acceso no autorizado a nuestros sistemas
      • Interferir con el funcionamiento normal del sitio web`
    },
    {
      id: 'account',
      title: '4. Cuenta de Usuario',
      content: `Para realizar compras, debe crear una cuenta proporcionando información precisa y completa. Usted es responsable de:
      • Mantener la confidencialidad de su contraseña
      • Todas las actividades que ocurran bajo su cuenta
      • Notificarnos inmediatamente sobre cualquier uso no autorizado
      
      Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.`
    },
    {
      id: 'orders',
      title: '5. Pedidos y Pagos',
      content: `Al realizar un pedido:
      • Usted hace una oferta para comprar productos
      • Confirmamos la aceptación enviando un email de confirmación
      • Los precios están sujetos a cambios sin previo aviso
      • Nos reservamos el derecho de rechazar pedidos
      
      Los pagos se procesan de forma segura a través de proveedores de pago certificados. Aceptamos tarjetas de crédito, débito y PSE.`
    },
    {
      id: 'shipping',
      title: '6. Envío y Entrega',
      content: `Política de envío:
      • Los tiempos de entrega son estimados y pueden variar
      • Los costos de envío se calculan según el destino y peso
      • Envío gratuito en compras superiores a $50.000
      • No somos responsables por retrasos causados por terceros
      
      Es responsabilidad del cliente proporcionar una dirección de entrega precisa.`
    },
    {
      id: 'returns',
      title: '7. Devoluciones y Reembolsos',
      content: `Política de devoluciones:
      • Aceptamos devoluciones dentro de 30 días de la compra
      • Los productos deben estar en su empaque original
      • Los productos deben estar en condiciones de reventa
      • Los costos de envío de devolución corren por cuenta del cliente
      
      Los reembolsos se procesan dentro de 5-10 días hábiles después de recibir la devolución.`
    },
    {
      id: 'intellectual',
      title: '8. Propiedad Intelectual',
      content: `Todo el contenido del sitio web, incluyendo textos, imágenes, logos, y diseños, está protegido por derechos de autor y otras leyes de propiedad intelectual. No puede:
      • Copiar, reproducir o distribuir nuestro contenido
      • Usar nuestras marcas comerciales sin autorización
      • Crear trabajos derivados basados en nuestro contenido`
    },
    {
      id: 'privacy',
      title: '9. Privacidad',
      content: `Su privacidad es importante para nosotros. Nuestra Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal. Al usar nuestro sitio web, usted acepta nuestras prácticas de privacidad.`
    },
    {
      id: 'limitation',
      title: '10. Limitación de Responsabilidad',
      content: `En la máxima medida permitida por la ley:
      • No seremos responsables por daños indirectos o consecuentes
      • Nuestra responsabilidad total no excederá el monto pagado por el producto
      • No garantizamos que el sitio web esté libre de errores o interrupciones
      • Los productos se venden "tal como están"`
    },
    {
      id: 'modifications',
      title: '11. Modificaciones',
      content: `Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Su uso continuado del sitio web constituye la aceptación de los términos modificados.`
    },
    {
      id: 'governing',
      title: '12. Ley Aplicable',
      content: `Estos términos se rigen por las leyes de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia.`
    },
    {
      id: 'contact',
      title: '13. Contacto',
      content: `Si tiene preguntas sobre estos términos y condiciones, puede contactarnos:
      • Email: legal@tiendamoderna.com
      • Teléfono: +57 300 123 4567
      • Dirección: Calle 123 #45-67, Bogotá, Colombia`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Legal', href: '/help' },
            { label: 'Términos y Condiciones' }
          ]} />
        </div>
      </div>

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
                Términos y Condiciones
              </h1>
              <p className="text-gray-600 mt-2">
                Última actualización: {lastUpdated}
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Información Importante
                </h3>
                <p className="text-blue-800 text-sm">
                  Al utilizar nuestros servicios, usted acepta estos términos y condiciones. 
                  Le recomendamos leer cuidadosamente todo el documento.
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
                  <FileText className="w-5 h-5" />
                  Índice
                </h2>
              </div>
              <div className="card-content">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-gray-600 hover:text-primary-600 transition-colors py-1"
                    >
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
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {section.title}
                      </h2>
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
              <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="card-content text-center">
                  <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ¿Tienes preguntas sobre nuestros términos?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Nuestro equipo legal está disponible para aclarar cualquier duda que puedas tener.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                      <Button className="btn btn-primary">
                        Contactar Equipo Legal
                      </Button>
                    </Link>
                    <Link to="/help">
                      <Button variant="outline" className="btn btn-outline">
                        Centro de Ayuda
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

export default Terms;
