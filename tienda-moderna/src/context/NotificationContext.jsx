import React, { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const showSuccess = (message, duration = 3000) => {
    toast.success(message, {
      duration,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      },
      iconTheme: {
        primary: 'white',
        secondary: '#10b981'
      }
    });
  };

  const showError = (message, duration = 4000) => {
    toast.error(message, {
      duration,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      },
      iconTheme: {
        primary: 'white',
        secondary: '#ef4444'
      }
    });
  };

  const showWarning = (message, duration = 3500) => {
    toast(message, {
      duration,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }
    });
  };

  const showInfo = (message, duration = 3000) => {
    toast(message, {
      duration,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }
    });
  };

  const showLoading = (message) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }
    });
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };

  return (
    <NotificationContext.Provider value={{
      showSuccess,
      showError,
      showWarning,
      showInfo,
      showLoading,
      dismissToast
    }}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          right: 20
        }}
        toastOptions={{
          duration: 3000,
          style: {
            maxWidth: '500px'
          }
        }}
      />
    </NotificationContext.Provider>
  );
};
