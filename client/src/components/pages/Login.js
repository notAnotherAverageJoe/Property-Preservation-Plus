import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css"; // Link to the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        navigate("/login");
      }, 40000);
    }
  }, [message, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isCreator
        ? "http://localhost:3000/api/auth/creator-login"
        : "http://localhost:3000/api/auth/login";

      const response = await axios.post(endpoint, { email, password });

      if (response.data.token) {
        login(response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {message && <p className="alert alert-info">{message}</p>}

        <div className="login-type">
          <label>
            <input
              type="radio"
              checked={!isCreator}
              onChange={() => setIsCreator(false)}
            />
            Regular User
          </label>
          <label>
            <input
              type="radio"
              checked={isCreator}
              onChange={() => setIsCreator(true)}
            />
            Creator
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
