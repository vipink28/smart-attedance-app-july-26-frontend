import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" />;
  }
  if (role !== user.role) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
