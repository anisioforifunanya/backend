import React, { useState } from 'react';
import styles from './styles/Modal.module.css'

export default function Modal ({ onClose, isModalOpen, title, className, children }) {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm ${className}`} onClick={handleOverlayClick}>
          <div className={`bg-white flex flex-col justify-between p-4 rounded-xl shadow-md ${styles.fadeUp}`}>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

