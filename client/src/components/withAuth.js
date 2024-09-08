import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const withAuth = (Component, requiredAccessLevel) => {
  return (props) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Check if user has the required access level
    if (
      user &&
      requiredAccessLevel !== undefined &&
      user.access_level < requiredAccessLevel
    ) {
      return <Navigate to="/dashboard" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
