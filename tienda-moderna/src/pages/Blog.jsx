import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  ChevronRight,
  Sparkles,
  Droplets,
  Shield,
  Leaf,
  Home,
  Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Breadcrumb from '../components/ui/Breadcrumb';
import Pagination from '../components/ui/Pagination';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import Rating from '../components/ui/Rating';
import Progress from '../components/ui/Progress';
import Tooltip from '../components/ui/Tooltip';
import Modal from '../components/ui/Modal';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';
import Dropdown from '../components/ui/Dropdown';
import SearchBar from '../components/ui/SearchBar';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'Todos los Artículos', count: 24 },
    { id: 'tips', name: 'Tips de Limpieza', count: 8 },
    { id: 'products', name: 'Productos', count: 6 },
    { id: 'eco', name: 'Eco-Amigable', count: 5 },
    { id: 'home', name: 'Hogar', count: 3 },
    { id: 'commercial', name: 'Comercial', count: 2 },
  ];

  const featuredPosts = [
    {
      id: 1,
      title: '10 Secretos para una Limpieza Profunda del Hogar',
      excerpt: 'Descubre técnicas profesionales que transformarán tu rutina de limpieza y mantendrán tu hogar impecable.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      author: 'María González',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'tips',
      views: 2847,
      likes: 156,
      featured: true
    },
    {
      id: 2,
      title: 'Productos Eco-Amigables: El Futuro de la Limpieza',
      excerpt: 'Conoce los beneficios de usar productos naturales y cómo contribuyen a un planeta más saludable.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600',
      author: 'Carlos Ruiz',
      date: '2024-01-12',
      readTime: '6 min',
      category: 'eco',
      views: 1923,
      likes: 89,
      featured: true
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: 'Cómo Limpiar Diferentes Tipos de Pisos',
      excerpt: 'Guía completa para el cuidado específico de cerámicos, madera, mármol y más.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      author: 'Ana Martínez',
      date: '2024-01-10',
      readTime: '5 min',
      category: 'tips',
      views: 1456,
      likes: 67,
      tags: ['pisos', 'cuidado', 'mantenimiento']
    },
    {
      id: 4,
      title: 'Desinfección Efectiva: Más Allá del COVID-19',
      excerpt: 'Protocolos de desinfección que debes mantener para un hogar saludable.',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
      author: 'Dr. Luis Pérez',
      date: '2024-01-08',
      readTime: '7 min',
      category: 'home',
      views: 2134,
      likes: 98,
      tags: ['desinfección', 'salud', 'hogar']
    },
    {
      id: 5,
      title: 'Limpieza de Oficinas: Productividad y Salud',
      excerpt: 'Cómo un ambiente limpio mejora el rendimiento laboral y el bienestar.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      author: 'Patricia Silva',
      date: '2024-01-05',
      readTime: '4 min',
      category: 'commercial',
      views: 987,
      likes: 45,
      tags: ['oficina', 'productividad', 'comercial']
    },
    {
      id: 6,
      title: 'Productos Multiusos: Simplifica tu Rutina',
      excerpt: 'Descubre cómo los productos multiusos pueden revolucionar tu forma de limpiar.',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
      author: 'Roberto Díaz',
      date: '2024-01-03',
      readTime: '6 min',
      category: 'products',
      views: 1678,
      likes: 78,
      tags: ['multiusos', 'eficiencia', 'productos']
    },
    {
      id: 7,
      title: 'Limpieza de Primavera: Checklist Completo',
      excerpt: 'Lista detallada para una limpieza profunda que renovará completamente tu hogar.',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
      author: 'Elena Vargas',
      date: '2024-01-01',
      readTime: '10 min',
      category: 'tips',
      views: 3245,
      likes: 187,
      tags: ['primavera', 'checklist', 'organización']
    },
    {
      id: 8,
      title: 'Ingredientes Naturales para Limpiar',
      excerpt: 'Bicarbonato, vinagre, limón y más: tu arsenal natural de limpieza.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
      author: 'Miguel Torres',
      date: '2023-12-28',
      readTime: '5 min',
      category: 'eco',
      views: 2567,
      likes: 134,
      tags: ['natural', 'ingredientes', 'casero']
    }
  ];

  const allPosts = [...featuredPosts, ...blogPosts];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tips': return <Lightbulb className="w-4 h-4" />;
      case 'products': return <Sparkles className="w-4 h-4" />;
      case 'eco': return <Leaf className="w-4 h-4" />;
      case 'home': return <Home className="w-4 h-4" />;
      case 'commercial': return <Shield className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'tips': return 'badge-warning';
      case 'products': return 'badge-primary';
      case 'eco': return 'badge-success';
      case 'home': return 'badge-info';
      case 'commercial': return 'badge-accent';
      default: return 'badge-outline';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <Breadcrumb items={[
            { label: 'Blog' }
          ]} />
        </div>
      </div>

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
                Blog de Limpieza
              </h1>
              <p className="text-xl text-primary-100">
                Tips, consejos y novedades del mundo de la limpieza profesional
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="card">
            <div className="card-content">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Buscar artículos, tips, productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                    className="input"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap
                        ${selectedCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      {getCategoryIcon(category.id)}
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Artículos Destacados
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="card card-hover h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary" className="badge badge-primary">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getCategoryColor(post.category)} className={`badge ${getCategoryColor(post.category)} text-xs`}>
                          {getCategoryIcon(post.category)}
                          <span className="ml-1 capitalize">{post.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                        </div>
                        <Button size="sm" className="btn btn-primary btn-sm">
                          Leer Más
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              {selectedCategory === 'all' ? 'Todos los Artículos' : 
               categories.find(c => c.id === selectedCategory)?.name} 
              ({filteredPosts.length})
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="card">
              <div className="card-content text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron artículos
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o categorías diferentes
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="card card-hover h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                      />
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="primary" className="badge badge-primary text-xs">
                            Destacado
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getCategoryColor(post.category)} className={`badge ${getCategoryColor(post.category)} text-xs`}>
                          {getCategoryIcon(post.category)}
                          <span className="ml-1 capitalize">{post.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {post.tags && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="badge badge-outline text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </div>
                        </div>
                        <Button size="sm" className="btn btn-primary btn-sm">
                          Leer
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="card-content text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                ¡No te Pierdas Nuestros Tips!
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Suscríbete a nuestro newsletter y recibe los mejores consejos de limpieza, 
                novedades de productos y ofertas exclusivas directamente en tu correo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="input flex-1"
                />
                <Button className="btn btn-primary">
                  Suscribirse
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
