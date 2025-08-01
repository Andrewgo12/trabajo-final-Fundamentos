import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LiveChat from '../ui/LiveChat';

const Layout = ({ children }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Layout;
