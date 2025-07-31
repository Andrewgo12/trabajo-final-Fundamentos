import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, CreditCard, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';
import { categories } from '../data/products';
import { useFeaturedProducts } from '../hooks/useProducts';

const Home = () => {
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="accent" className="text-white bg-white/20">
                🎉 Gran Inauguración
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight">
                Tu hogar más
                <span className="text-gradient bg-gradient-to-r from-accent-300 to-yellow-300 bg-clip-text text-transparent">
                  {' '}limpio{' '}
                </span>
                que nunca
              </h1>
              <p className="text-xl text-primary-100 leading-relaxed">
                Descubre nuestra amplia gama de productos de limpieza profesionales. 
                Calidad garantizada, precios increíbles y envío gratis en compras superiores a $50.000.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button
                    variant="accent"
                    size="lg"
                    className="group"
                  >
                    Ver Productos
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/offers">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Ver Ofertas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=600&fit=crop"
                  alt="Productos de limpieza"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Envío Gratis</h3>
              <p className="text-gray-600 text-sm">En compras superiores a $50.000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600 text-sm">Protección total de tus datos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Múltiples Pagos</h3>
              <p className="text-gray-600 text-sm">Tarjetas, PSE, efectivo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Soporte 24/7</h3>
              <p className="text-gray-600 text-sm">Atención personalizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Explora Nuestras Categorías
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas para mantener tu hogar impecable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.id} hover className="group cursor-pointer">
                <Link to={`/category/${category.id}`}>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                Productos Destacados
              </h2>
              <p className="text-xl text-gray-600">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                Ver Todos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-t-xl"></div>
                  <div className="bg-white p-6 rounded-b-xl border border-gray-100">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Miles de familias confían en nosotros para mantener sus hogares limpios y seguros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                location: "Bogotá",
                rating: 5,
                comment: "Excelente calidad en todos los productos. Mi casa nunca había estado tan limpia y fresca.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
              },
              {
                name: "Carlos Rodríguez",
                location: "Medellín",
                rating: 5,
                comment: "El servicio de entrega es súper rápido y los precios son muy competitivos. Totalmente recomendado.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
              },
              {
                name: "Ana Martínez",
                location: "Cali",
                rating: 5,
                comment: "Los productos eco-amigables son fantásticos. Cuido el medio ambiente sin sacrificar la limpieza.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Clientes Satisfechos", icon: "👥" },
              { number: "500+", label: "Productos Disponibles", icon: "🧽" },
              { number: "24h", label: "Entrega Rápida", icon: "🚚" },
              { number: "99%", label: "Satisfacción Garantizada", icon: "⭐" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            ¡No te pierdas nuestras ofertas!
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe descuentos exclusivos, 
            nuevos productos y consejos de limpieza directamente en tu correo.
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

          <div className="flex justify-center items-center mt-8 space-x-6 text-primary-100">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm">100% Seguro</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              <span className="text-sm">Envío Gratis</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              <span className="text-sm">Pago Fácil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Consejos de Limpieza
              </h2>
              <p className="text-gray-600">
                Aprende técnicas profesionales para mantener tu hogar impecable
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="btn btn-outline">
                Ver Todos los Artículos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cómo limpiar vidrios sin dejar marcas",
                excerpt: "Descubre el secreto para obtener vidrios cristalinos usando productos caseros y técnicas profesionales.",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
                date: "15 Mar 2024",
                readTime: "5 min"
              },
              {
                title: "Desinfección efectiva contra virus y bacterias",
                excerpt: "Guía completa sobre los mejores desinfectantes y métodos para proteger tu familia.",
                image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop",
                date: "12 Mar 2024",
                readTime: "7 min"
              },
              {
                title: "Productos eco-amigables para el hogar",
                excerpt: "Alternativas naturales que cuidan el medio ambiente sin comprometer la limpieza.",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
                date: "10 Mar 2024",
                readTime: "4 min"
              }
            ].map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{article.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>

                  <Link
                    to="/blog"
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    Leer más
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
