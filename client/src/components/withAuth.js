import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Higher-order component (HOC) to protect routes based on authentication and access level
const withAuth = (Component, requiredAccessLevel) => {
  // Return a new component
  return (props) => {
    const { isAuthenticated, user } = useAuth(); // Destructure authentication state and user from the context

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // If the user's access level is lower than the required level, redirect to the unauthorized page
    if (user.access_level < requiredAccessLevel) {
      return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
    }

    // If authenticated and has the required access level, render the specified component
    return <Component {...props} />;
  };
};

export default withAuth; // Export the higher-order component for use in routing
