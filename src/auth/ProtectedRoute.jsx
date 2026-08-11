import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  if (role !== user.role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
