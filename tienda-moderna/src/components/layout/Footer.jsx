import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Clock
} from 'lucide-react';
import Button from '../ui/Button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-2">
              ¡Suscríbete a nuestro newsletter!
            </h3>
            <p className="text-primary-100 mb-6">
              Recibe ofertas exclusivas y novedades directamente en tu correo
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Button 
                variant="accent" 
                className="rounded-l-none px-6"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TM</span>
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold">Tienda Moderna</h3>
                  <p className="text-sm text-gray-400">Productos de limpieza</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Tu tienda de confianza para productos de limpieza de alta calidad. 
                Más de 10 años sirviendo a familias colombianas.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                    Todos los Productos
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-gray-300 hover:text-white transition-colors">
                    Ofertas Especiales
                  </Link>
                </li>
                <li>
                  <Link to="/new-products" className="text-gray-300 hover:text-white transition-colors">
                    Nuevos Productos
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className="text-gray-300 hover:text-white transition-colors">
                    Marcas
                  </Link>
                </li>
                <li>
                  <Link to="/sustainability" className="text-gray-300 hover:text-white transition-colors">
                    Sostenibilidad
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Atención al Cliente</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                    Información de Envío
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link to="/warranty" className="text-gray-300 hover:text-white transition-colors">
                    Garantías
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-gray-300">Calle 123 #45-67</p>
                    <p className="text-gray-300">Bogotá, Colombia</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <p className="text-gray-300">+57 300 123 4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <p className="text-gray-300">info@tiendamoderna.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-gray-300">Lun - Vie: 8:00 - 18:00</p>
                    <p className="text-gray-300">Sáb: 9:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-800 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold">Envío Gratis</h5>
                <p className="text-sm text-gray-400">En compras superiores a $50.000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold">Compra Segura</h5>
                <p className="text-sm text-gray-400">Protección total de datos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold">Múltiples Pagos</h5>
                <p className="text-sm text-gray-400">Tarjetas, PSE, efectivo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-primary-400" />
              <div>
                <h5 className="font-semibold">Soporte 24/7</h5>
                <p className="text-sm text-gray-400">Atención personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Tienda Moderna. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <img src="/visa.png" alt="Visa" className="h-6 opacity-70" />
              <img src="/mastercard.png" alt="Mastercard" className="h-6 opacity-70" />
              <img src="/pse.png" alt="PSE" className="h-6 opacity-70" />
              <span className="text-gray-400 text-sm">Pagos seguros</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
