import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Cart from '../cart/Cart';
import AuthModals from '../auth/AuthModals';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Sidebar />
      <Cart />
      <AuthModals />
    </div>
  );
};

export default Layout;
