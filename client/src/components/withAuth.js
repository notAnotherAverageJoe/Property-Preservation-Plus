import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Higher-order component (HOC) to protect routes based on authentication and access level
const withAuth = (Component, requiredAccessLevel) => {
  // Return a new component
  return (props) => {
    const { isAuthenticated, user } = useAuth(); // Destructure authentication state and user from the context

    // Ensure that user exists before checking access_level
    if (!isAuthenticated || !user || user.access_level < requiredAccessLevel) {
      return <Navigate to="/unauthorized" />;
    }

    // If authenticated and has the required access level, render the specified component
    return <Component {...props} />;
  };
};

export default withAuth;
