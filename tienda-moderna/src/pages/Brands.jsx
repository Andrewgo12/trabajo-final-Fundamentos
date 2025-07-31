import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Award, 
  ArrowLeft,
  CheckCircle,
  Package,
  Sparkles,
  Shield,
  Leaf,
  Heart,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const brands = [
    {
      id: 1,
      name: 'CleanMaster Pro',
      logo: '🧽',
      description: 'Líder en productos de limpieza profesional para el hogar',
      category: 'premium',
      country: 'Colombia',
      founded: 1995,
      products: 45,
      rating: 4.8,
      reviews: 2847,
      specialties: ['Desengrasantes', 'Limpiadores multiusos', 'Productos antibacteriales'],
      certifications: ['ISO 9001', 'EcoCert'],
      featured: true,
      bestseller: true
    },
    {
      id: 2,
      name: 'EcoClean Natural',
      logo: '🌿',
      description: 'Productos de limpieza 100% naturales y biodegradables',
      category: 'eco',
      country: 'Costa Rica',
      founded: 2010,
      products: 28,
      rating: 4.9,
      reviews: 1923,
      specialties: ['Limpiadores naturales', 'Productos orgánicos', 'Cero químicos'],
      certifications: ['USDA Organic', 'Green Seal'],
      featured: true,
      eco: true
    },
    {
      id: 3,
      name: 'PowerClean Industrial',
      logo: '⚡',
      description: 'Soluciones de limpieza de alta potencia para uso intensivo',
      category: 'industrial',
      country: 'México',
      founded: 1988,
      products: 67,
      rating: 4.7,
      reviews: 3421,
      specialties: ['Limpieza industrial', 'Desinfectantes hospitalarios', 'Removedores'],
      certifications: ['FDA Approved', 'EPA Registered'],
      featured: false,
      professional: true
    },
    {
      id: 4,
      name: 'FreshHome',
      logo: '🏠',
      description: 'Productos de limpieza para el hogar con aromas únicos',
      category: 'home',
      country: 'Colombia',
      founded: 2005,
      products: 32,
      rating: 4.6,
      reviews: 1567,
      specialties: ['Ambientadores', 'Limpiadores aromáticos', 'Cuidado de telas'],
      certifications: ['Dermatológicamente testado'],
      featured: false,
      popular: true
    },
    {
      id: 5,
      name: 'AquaPure',
      logo: '💧',
      description: 'Especialistas en productos de limpieza a base de agua',
      category: 'eco',
      country: 'Chile',
      founded: 2015,
      products: 19,
      rating: 4.8,
      reviews: 892,
      specialties: ['Limpiadores acuosos', 'Sin solventes', 'Biodegradables'],
      certifications: ['Cradle to Cradle', 'EcoLabel'],
      featured: false,
      eco: true
    },
    {
      id: 6,
      name: 'SparkleMax',
      logo: '✨',
      description: 'Productos premium para superficies delicadas y cristales',
      category: 'premium',
      country: 'España',
      founded: 1992,
      products: 24,
      rating: 4.9,
      reviews: 1234,
      specialties: ['Limpia cristales', 'Cuidado de superficies', 'Productos premium'],
      certifications: ['CE Marking', 'ISO 14001'],
      featured: true,
      luxury: true
    },
    {
      id: 7,
      name: 'BioClean Solutions',
      logo: '🧪',
      description: 'Innovación en biotecnología aplicada a la limpieza',
      category: 'innovation',
      country: 'Brasil',
      founded: 2018,
      products: 15,
      rating: 4.7,
      reviews: 567,
      specialties: ['Enzimas naturales', 'Biotecnología', 'Limpieza molecular'],
      certifications: ['Biotechnology Innovation'],
      featured: false,
      innovative: true
    },
    {
      id: 8,
      name: 'SafeGuard',
      logo: '🛡️',
      description: 'Productos de desinfección y protección antimicrobiana',
      category: 'health',
      country: 'Estados Unidos',
      founded: 1985,
      products: 38,
      rating: 4.8,
      reviews: 2156,
      specialties: ['Desinfectantes', 'Antimicrobianos', 'Protección sanitaria'],
      certifications: ['EPA Registered', 'CDC Approved'],
      featured: true,
      health: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas las Marcas', count: brands.length },
    { id: 'premium', name: 'Premium', count: brands.filter(b => b.category === 'premium').length },
    { id: 'eco', name: 'Eco-Amigables', count: brands.filter(b => b.category === 'eco').length },
    { id: 'industrial', name: 'Industrial', count: brands.filter(b => b.category === 'industrial').length },
    { id: 'home', name: 'Hogar', count: brands.filter(b => b.category === 'home').length },
    { id: 'health', name: 'Salud', count: brands.filter(b => b.category === 'health').length },
    { id: 'innovation', name: 'Innovación', count: brands.filter(b => b.category === 'innovation').length }
  ];

  const filteredBrands = brands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           brand.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.products - a.products;
        case 'founded':
          return a.founded - b.founded;
        default:
          return 0;
      }
    });

  const featuredBrands = brands.filter(brand => brand.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="container-custom py-16">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/"
              className="p-2 text-primary-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">
                Nuestras Marcas
              </h1>
              <p className="text-xl text-primary-100">
                Descubre las mejores marcas de productos de limpieza del mercado
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Featured Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Marcas Destacadas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Las marcas más populares y confiables en productos de limpieza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card card-hover h-full">
                  <div className="card-content">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">{brand.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{brand.name}</h3>
                          {brand.bestseller && (
                            <Badge variant="accent" className="badge badge-accent text-xs">
                              Bestseller
                            </Badge>
                          )}
                          {brand.eco && (
                            <Badge variant="success" className="badge badge-success text-xs">
                              Eco
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{brand.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({brand.reviews} reseñas)</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{brand.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {brand.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {brand.products} productos
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {brand.specialties.slice(0, 2).map((specialty, i) => (
                            <Badge key={i} variant="outline" className="badge badge-outline text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {brand.specialties.length > 2 && (
                            <Badge variant="outline" className="badge badge-outline text-xs">
                              +{brand.specialties.length - 2} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link to={`/products?brand=${brand.name}`}>
                      <Button className="btn btn-primary w-full">
                        Ver Productos
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="card">
            <div className="card-content">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Buscar marcas, productos o especialidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                    className="input"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input min-w-[150px]"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input min-w-[150px]"
                  >
                    <option value="name">Ordenar por Nombre</option>
                    <option value="rating">Ordenar por Rating</option>
                    <option value="products">Ordenar por Productos</option>
                    <option value="founded">Ordenar por Antigüedad</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* All Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Todas las Marcas ({filteredBrands.length})
            </h2>
          </div>

          {filteredBrands.length === 0 ? (
            <Card className="card">
              <div className="card-content text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron marcas
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o filtros diferentes
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="card card-hover">
                    <div className="card-content">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{brand.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                            <div className="flex gap-1">
                              {brand.bestseller && (
                                <Badge variant="accent" className="badge badge-accent text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Top
                                </Badge>
                              )}
                              {brand.eco && (
                                <Badge variant="success" className="badge badge-success text-xs">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Eco
                                </Badge>
                              )}
                              {brand.luxury && (
                                <Badge variant="warning" className="badge badge-warning text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{brand.rating}</span>
                              <span className="text-sm text-gray-500">({brand.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              Desde {brand.founded}
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-3">{brand.description}</p>

                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {brand.country}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-3 h-3" />
                              {brand.products} productos
                            </span>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs font-medium text-gray-700 mb-2">Especialidades:</p>
                            <div className="flex flex-wrap gap-1">
                              {brand.specialties.map((specialty, i) => (
                                <Badge key={i} variant="outline" className="badge badge-outline text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {brand.certifications.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-medium text-gray-700 mb-2">Certificaciones:</p>
                              <div className="flex flex-wrap gap-1">
                                {brand.certifications.map((cert, i) => (
                                  <Badge key={i} variant="success" className="badge badge-success text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Link to={`/products?brand=${brand.name}`}>
                            <Button className="btn btn-primary w-full">
                              <Package className="w-4 h-4 mr-2" />
                              Ver {brand.products} Productos
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                ¿No Encuentras tu Marca Favorita?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Estamos constantemente agregando nuevas marcas y productos. 
                Contáctanos si hay alguna marca específica que te gustaría ver en nuestra tienda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="btn btn-primary">
                    <Heart className="w-4 h-4 mr-2" />
                    Sugerir Marca
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" className="btn btn-outline">
                    <Package className="w-4 h-4 mr-2" />
                    Ver Todos los Productos
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Brand Comparison Tool */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Comparador de Marcas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Compara las características y beneficios de nuestras marcas principales
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Característica</th>
                  <th className="text-center p-4 font-semibold text-gray-900">CleanMaster Pro</th>
                  <th className="text-center p-4 font-semibold text-gray-900">EcoClean Natural</th>
                  <th className="text-center p-4 font-semibold text-gray-900">PowerClean Industrial</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Eco-Amigable',
                    cleanmaster: '⭐⭐⭐',
                    ecoclean: '⭐⭐⭐⭐⭐',
                    powerclean: '⭐⭐'
                  },
                  {
                    feature: 'Poder de Limpieza',
                    cleanmaster: '⭐⭐⭐⭐⭐',
                    ecoclean: '⭐⭐⭐⭐',
                    powerclean: '⭐⭐⭐⭐⭐'
                  },
                  {
                    feature: 'Precio',
                    cleanmaster: '⭐⭐⭐⭐',
                    ecoclean: '⭐⭐⭐',
                    powerclean: '⭐⭐'
                  },
                  {
                    feature: 'Disponibilidad',
                    cleanmaster: '⭐⭐⭐⭐⭐',
                    ecoclean: '⭐⭐⭐⭐',
                    powerclean: '⭐⭐⭐⭐'
                  },
                  {
                    feature: 'Seguridad Familiar',
                    cleanmaster: '⭐⭐⭐⭐',
                    ecoclean: '⭐⭐⭐⭐⭐',
                    powerclean: '⭐⭐⭐'
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-4 text-center">{row.cleanmaster}</td>
                    <td className="p-4 text-center">{row.ecoclean}</td>
                    <td className="p-4 text-center">{row.powerclean}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand Certifications */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Certificaciones y Garantías
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Todas nuestras marcas cumplen con los más altos estándares de calidad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: 'ISO 9001', desc: 'Calidad Certificada' },
              { icon: '🌱', title: 'Eco-Friendly', desc: 'Amigable con el Ambiente' },
              { icon: '🔒', title: 'Seguridad', desc: 'Productos Seguros' },
              { icon: '✅', title: 'INVIMA', desc: 'Aprobado por INVIMA' }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <Card className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white">
            <div className="card-content text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Mantente Informado sobre Nuevas Marcas
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Sé el primero en conocer cuando agregamos nuevas marcas y productos a nuestro catálogo
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="input flex-1 bg-white text-gray-900"
                />
                <Button variant="accent" className="btn btn-accent">
                  Suscribirse
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Brands;
