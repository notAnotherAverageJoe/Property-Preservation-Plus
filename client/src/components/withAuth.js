import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const withAuth = (Component, requiredAccessLevel) => {
  return (props) => {
    const { isAuthenticated, user, loading } = useAuth(); // Added loading check

    // Wait for authentication to finish loading
    if (loading) {
      return <div>Loading...</div>;
    }

    // If not authenticated or user does not meet the required access level, redirect
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" />;
    }

    // If not authenticated or user does not meet the required access level, redirect
    if (user.access_level < requiredAccessLevel) {
      return <Navigate to="/unauthorized" />;
    }

    // If authenticated and has the required access level, render the component
    return <Component {...props} />;
  };
};

export default withAuth;
