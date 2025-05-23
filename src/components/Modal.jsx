import React from "react";

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

const modalStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  position: "relative",
};

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
  if (!isOpen) return null;

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
