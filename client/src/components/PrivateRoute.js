import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  // Get the authentication status from the AuthContext
  const { isAuthenticated } = useAuth();

  // Render the children if the user is authenticated, otherwise redirect to the login page
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
