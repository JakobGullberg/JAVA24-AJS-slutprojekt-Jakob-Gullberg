import React from "react";


// Stil för hela overlayen (bakgrund + centrerad modal)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

// Själva modalens "kort"
const modalStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  position: "relative",
};

// Stäng-knappens stil (uppe till höger)
const closeButtonStyle = {
  position: "absolute",
  top: "0.5rem",
  right: "1rem",
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#333",
};

const Modal = ({ isOpen, onClose, children }) => {
  // Rendera inget om modal inte ska visas
  if (!isOpen) return null;

  // Om användaren klickar utanför modalen (på overlay) → stäng
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleBackdropClick}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
