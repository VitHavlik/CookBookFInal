import React, { useEffect } from 'react';

const ConfirmationWindow = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <div style={{color: "red"}} >
      <p>{modalContent}</p>
    </div>
  );
};

export default ConfirmationWindow;
