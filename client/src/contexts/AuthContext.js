import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Add state for the token

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken); // Use jwtDecode function
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            company_id: decodedToken.company_id,
          });
          setToken(storedToken); // Store the token
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const decodedToken = jwtDecode(newToken); // Use jwtDecode function
    setIsAuthenticated(true);
    setUser({
      id: decodedToken.id,
      email: decodedToken.email,
      company_id: decodedToken.company_id,
    });
    setToken(newToken); // Set token on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setToken(null); // Clear token on logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
