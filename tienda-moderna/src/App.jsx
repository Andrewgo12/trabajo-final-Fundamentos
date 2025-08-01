import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';

// Simple 404 component
const NotFound = () => (
  <div style={{ 
    minHeight: '50vh', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>😵</div>
    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--dark-gray)' }}>
      Página No Encontrada
    </h2>
    <p style={{ color: 'var(--dark-gray)', marginBottom: '2rem' }}>
      La página que buscas no existe o ha sido movida.
    </p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <a href="/" className="btn btn-primary">
        🏠 Ir al Inicio
      </a>
      <a href="/products" className="btn btn-secondary">
        🛍️ Ver Productos
      </a>
    </div>
  </div>
);

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
}

export default App;
