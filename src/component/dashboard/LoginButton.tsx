import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginButton: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {isAuthenticated ? (
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
};

export default LoginButton;
