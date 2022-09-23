import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './Modal.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login' onClick={() => setShowModal(true)}>Sign in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} className='themodalcomp' >
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
