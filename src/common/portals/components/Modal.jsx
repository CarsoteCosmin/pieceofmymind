import React, { useEffect } from 'react';

import PortalWrapper from '../PortalWrapper';

export const Modal = ({ show, onClose = () => {} }) => {
  useEffect(() => {
    const close = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      {show && (
        <PortalWrapper name="modal">
          <div className="absolute">ceva</div>
        </PortalWrapper>
      )}
    </>
  );
};

export default Modal;
