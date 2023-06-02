import React, { useEffect } from 'react';

const Modal = ({ image, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className="overlay" onClick={handleCloseModal}>
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
