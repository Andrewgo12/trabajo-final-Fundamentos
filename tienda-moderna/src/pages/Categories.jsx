import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Grid3X3, 
  Search, 
  ArrowLeft,
  Sparkles,
  Droplets,
  Wind,
  Shield,
  Home,
  Building,
  Car,
  Shirt,
  Utensils,
  Bath,
  Sofa,
  Flower,
  Zap,
  Leaf,
  Package,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mainCategories = [
    {
      id: 'multipurpose',
      name: 'Limpiadores Multiusos',
      description: 'Productos versátiles para múltiples superficies',
      icon: Sparkles,
      color: 'primary',
      productCount: 45,
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
      popular: true,
      subcategories: ['Todo en uno', 'Desengrasantes', 'Antibacteriales', 'Aromáticos']
    },
    {
      id: 'kitchen',
      name: 'Cocina',
      description: 'Especialistas en limpieza de cocinas y utensilios',
      icon: Utensils,
      color: 'accent',
      productCount: 38,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      trending: true,
      subcategories: ['Desengrasantes', 'Lavavajillas', 'Hornos', 'Superficies']
    },
    {
      id: 'bathroom',
      name: 'Baño',
      description: 'Productos especializados para baños y sanitarios',
      icon: Bath,
      color: 'info',
      productCount: 32,
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400',
      popular: true,
      subcategories: ['Desinfectantes', 'Anti-sarro', 'Azulejos', 'Inodoros']
    },
    {
      id: 'floors',
      name: 'Pisos y Superficies',
      description: 'Cuidado especializado para todo tipo de pisos',
      icon: Home,
      color: 'success',
      productCount: 29,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      subcategories: ['Cerámicos', 'Madera', 'Mármol', 'Laminados']
    },
    {
      id: 'laundry',
      name: 'Lavandería',
      description: 'Detergentes y productos para el cuidado de la ropa',
      icon: Shirt,
      color: 'purple',
      productCount: 41,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      trending: true,
      subcategories: ['Detergentes', 'Suavizantes', 'Quitamanchas', 'Blanqueadores']
    },
    {
      id: 'glass',
      name: 'Cristales y Vidrios',
      description: 'Limpieza perfecta para superficies transparentes',
      icon: Droplets,
      color: 'cyan',
      productCount: 18,
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
      subcategories: ['Ventanas', 'Espejos', 'Mamparas', 'Cristalería']
    },
    {
      id: 'disinfectants',
      name: 'Desinfectantes',
      description: 'Protección antimicrobiana y sanitización',
      icon: Shield,
      color: 'red',
      productCount: 35,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
      essential: true,
      subcategories: ['Alcohol', 'Cloro', 'Cuaternarios', 'Naturales']
    },
    {
      id: 'air-fresheners',
      name: 'Ambientadores',
      description: 'Fragancias y purificadores de ambiente',
      icon: Wind,
      color: 'pink',
      productCount: 26,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      subcategories: ['Aerosoles', 'Líquidos', 'Geles', 'Automáticos']
    },
    {
      id: 'furniture',
      name: 'Muebles',
      description: 'Cuidado especializado para muebles y tapicería',
      icon: Sofa,
      color: 'brown',
      productCount: 22,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      subcategories: ['Madera', 'Cuero', 'Tela', 'Metales']
    },
    {
      id: 'automotive',
      name: 'Automotriz',
      description: 'Productos especiales para limpieza de vehículos',
      icon: Car,
      color: 'gray',
      productCount: 31,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      subcategories: ['Exterior', 'Interior', 'Llantas', 'Motores']
    },
    {
      id: 'industrial',
      name: 'Industrial',
      description: 'Soluciones de limpieza para uso profesional',
      icon: Building,
      color: 'slate',
      productCount: 47,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      professional: true,
      subcategories: ['Degreasers', 'Solventes', 'Ácidos', 'Alcalinos']
    },
    {
      id: 'eco-friendly',
      name: 'Eco-Amigables',
      description: 'Productos naturales y biodegradables',
      icon: Leaf,
      color: 'green',
      productCount: 33,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
      eco: true,
      trending: true,
      subcategories: ['Orgánicos', 'Biodegradables', 'Sin químicos', 'Veganos']
    }
  ];

  const filteredCategories = mainCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-100 text-primary-600 border-primary-200',
      accent: 'bg-accent-100 text-accent-600 border-accent-200',
      info: 'bg-info-100 text-info-600 border-info-200',
      success: 'bg-success-100 text-success-600 border-success-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      cyan: 'bg-cyan-100 text-cyan-600 border-cyan-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200',
      brown: 'bg-amber-100 text-amber-600 border-amber-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200',
      slate: 'bg-slate-100 text-slate-600 border-slate-200',
      green: 'bg-green-100 text-green-600 border-green-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  const stats = {
    totalCategories: mainCategories.length,
    totalProducts: mainCategories.reduce((sum, cat) => sum + cat.productCount, 0),
    popularCategories: mainCategories.filter(cat => cat.popular).length,
    ecoCategories: mainCategories.filter(cat => cat.eco).length
  };

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
                Categorías de Productos
              </h1>
              <p className="text-xl text-primary-100">
                Encuentra exactamente lo que necesitas para cada área de limpieza
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="card text-center">
              <div className="card-content">
                <div className="text-2xl font-bold text-primary-600 mb-1">{stats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categorías</div>
              </div>
            </Card>
            <Card className="card text-center">
              <div className="card-content">
                <div className="text-2xl font-bold text-accent-600 mb-1">{stats.totalProducts}</div>
                <div className="text-sm text-gray-600">Productos</div>
              </div>
            </Card>
            <Card className="card text-center">
              <div className="card-content">
                <div className="text-2xl font-bold text-success-600 mb-1">{stats.popularCategories}</div>
                <div className="text-sm text-gray-600">Populares</div>
              </div>
            </Card>
            <Card className="card text-center">
              <div className="card-content">
                <div className="text-2xl font-bold text-green-600 mb-1">{stats.ecoCategories}</div>
                <div className="text-sm text-gray-600">Eco-Amigables</div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="card">
            <div className="card-content">
              <Input
                type="text"
                placeholder="Buscar categorías, productos o especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                className="input"
              />
            </div>
          </Card>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {filteredCategories.length === 0 ? (
            <Card className="card">
              <div className="card-content text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron categorías
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Link to={`/products?category=${category.id}`}>
                    <Card className="card card-hover h-full group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className={`w-full h-48 ${getColorClasses(category.color)} flex items-center justify-center relative`}>
                          <category.icon className="w-16 h-16 opacity-20 absolute" />
                          <category.icon className="w-12 h-12 relative z-10" />
                          
                          {/* Badges */}
                          <div className="absolute top-3 right-3 flex flex-col gap-1">
                            {category.popular && (
                              <Badge variant="warning" className="badge badge-warning text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                            {category.trending && (
                              <Badge variant="success" className="badge badge-success text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {category.eco && (
                              <Badge variant="success" className="badge badge-success text-xs">
                                <Leaf className="w-3 h-3 mr-1" />
                                Eco
                              </Badge>
                            )}
                            {category.essential && (
                              <Badge variant="error" className="badge badge-error text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Esencial
                              </Badge>
                            )}
                            {category.professional && (
                              <Badge variant="info" className="badge badge-info text-xs">
                                <Building className="w-3 h-3 mr-1" />
                                Pro
                              </Badge>
                            )}
                          </div>

                          {/* Product Count */}
                          <div className="absolute bottom-3 left-3">
                            <Badge variant="outline" className="badge badge-outline text-xs bg-white/90">
                              <Package className="w-3 h-3 mr-1" />
                              {category.productCount} productos
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                        
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-700 mb-2">Subcategorías:</p>
                          <div className="flex flex-wrap gap-1">
                            {category.subcategories.slice(0, 3).map((sub, i) => (
                              <Badge key={i} variant="outline" className="badge badge-outline text-xs">
                                {sub}
                              </Badge>
                            ))}
                            {category.subcategories.length > 3 && (
                              <Badge variant="outline" className="badge badge-outline text-xs">
                                +{category.subcategories.length - 3} más
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>Muy solicitado</span>
                          </div>
                          <Button size="sm" className="btn btn-primary btn-sm group-hover:bg-primary-700">
                            Ver Productos
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
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
                <Grid3X3 className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                ¿No Encuentras lo que Buscas?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Nuestro equipo de expertos puede ayudarte a encontrar el producto perfecto 
                para tus necesidades específicas de limpieza.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="btn btn-primary">
                    <Users className="w-4 h-4 mr-2" />
                    Consultar Experto
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

        {/* Category Usage Guide */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Guía de Uso por Categoría
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Aprende cuándo y cómo usar cada tipo de producto para obtener los mejores resultados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'Multiusos',
                icon: '🧽',
                tips: [
                  'Ideal para limpieza diaria',
                  'Usar en superficies no porosas',
                  'Diluir según instrucciones',
                  'Perfecto para cocinas y baños'
                ],
                frequency: 'Uso diario'
              },
              {
                category: 'Desinfectantes',
                icon: '🦠',
                tips: [
                  'Aplicar después de limpiar',
                  'Dejar actuar 30 segundos',
                  'No mezclar con otros productos',
                  'Usar en áreas de alto contacto'
                ],
                frequency: 'Según necesidad'
              },
              {
                category: 'Eco-Amigables',
                icon: '🌱',
                tips: [
                  'Seguros para niños y mascotas',
                  'Biodegradables',
                  'Sin químicos agresivos',
                  'Ideales para uso frecuente'
                ],
                frequency: 'Uso regular'
              }
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card h-full">
                  <div className="card-content">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-3">{guide.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {guide.category}
                      </h3>
                      <Badge variant="outline" className="badge badge-outline">
                        {guide.frequency}
                      </Badge>
                    </div>

                    <ul className="space-y-3">
                      {guide.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Comparison Chart */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Comparación de Categorías
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra la categoría perfecta según tus necesidades específicas
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Categoría</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Poder de Limpieza</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Seguridad</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Eco-Amigable</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Precio Promedio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    category: 'Multiusos',
                    power: '⭐⭐⭐⭐',
                    safety: '⭐⭐⭐⭐',
                    eco: '⭐⭐⭐',
                    price: '$15.000 - $25.000'
                  },
                  {
                    category: 'Desinfectantes',
                    power: '⭐⭐⭐⭐⭐',
                    safety: '⭐⭐⭐',
                    eco: '⭐⭐',
                    price: '$20.000 - $35.000'
                  },
                  {
                    category: 'Eco-Amigables',
                    power: '⭐⭐⭐',
                    safety: '⭐⭐⭐⭐⭐',
                    eco: '⭐⭐⭐⭐⭐',
                    price: '$25.000 - $40.000'
                  },
                  {
                    category: 'Pisos',
                    power: '⭐⭐⭐⭐',
                    safety: '⭐⭐⭐⭐',
                    eco: '⭐⭐⭐',
                    price: '$18.000 - $30.000'
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-4 font-medium text-gray-900">{row.category}</td>
                    <td className="p-4 text-center">{row.power}</td>
                    <td className="p-4 text-center">{row.safety}</td>
                    <td className="p-4 text-center">{row.eco}</td>
                    <td className="p-4 text-center font-medium text-primary-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Newsletter */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <Card className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white">
            <div className="card-content text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Recibe Consejos por Categoría
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Suscríbete para recibir tips específicos de limpieza según las categorías que más te interesan
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

export default Categories;
