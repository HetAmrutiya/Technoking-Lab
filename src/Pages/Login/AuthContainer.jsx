import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthContainer = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="tk-auth-modal-overlay">
      {isLogin ? (
        <Login onToggleMode={handleToggleMode} onClose={onClose} />
      ) : (
        <SignUp onToggleMode={handleToggleMode} onClose={onClose} />
      )}
    </div>
  );
};

export default AuthContainer;
