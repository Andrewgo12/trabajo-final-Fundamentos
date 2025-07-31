import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import ErrorBoundary, { NotFoundError } from './components/ui/ErrorBoundary';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Offers from './pages/Offers';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Settings from './pages/Settings';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Cookies from './pages/Cookies';
import Sustainability from './pages/Sustainability';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import UIDemo from './pages/UIDemo';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import NewProducts from './pages/NewProducts';
import Warranty from './pages/Warranty';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
          <Layout>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:categoryId" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/support" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/ui-demo" element={<UIDemo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/new-products" element={<NewProducts />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="*" element={<NotFoundError />} />
          </Routes>
        </Layout>
      </Router>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
