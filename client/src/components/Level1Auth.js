import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const level1Auth = (Component, requiredAccessLevel) => {
  return (props) => {
    const { token, user, isAuthenticated } = useAuth();

    // Check if user is authenticated
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Check if user has the required access level
    if (
      user &&
      requiredAccessLevel !== undefined &&
      user.accessLevel < requiredAccessLevel
    ) {
      return <Navigate to="/dashboard/level1" />;
    }

    return <Component {...props} />;
  };
};

export default level1Auth;
