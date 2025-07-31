import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from '../ui/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModals = () => {
  const { showLoginModal, showRegisterModal, hideModals } = useAuth();

  return (
    <>
      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={hideModals}
        size="md"
        className="max-h-[90vh] overflow-y-auto"
      >
        <LoginForm />
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={showRegisterModal}
        onClose={hideModals}
        size="md"
        className="max-h-[90vh] overflow-y-auto"
      >
        <RegisterForm />
      </Modal>
    </>
  );
};

export default AuthModals;
