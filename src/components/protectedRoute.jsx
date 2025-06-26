import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user || user.rol !== "admin") {
    return <Navigate to="/players" replace />;
  }
  return children;
};

export default ProtectedRoute;