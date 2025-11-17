import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token nahi → user ko login page par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token present → actual component render hoga
  return children;
};

export default ProtectedRoute;
