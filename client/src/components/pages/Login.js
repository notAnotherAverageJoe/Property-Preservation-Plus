import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreator, setIsCreator] = useState(false); // State to differentiate login type
  const navigate = useNavigate(); // Use navigate to redirect
  const { login } = useAuth(); // Access the login function from context
  const location = useLocation(); // Hook to get location object
  const message = location.state?.message; // Get the message from location state

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        navigate("/login"); // Redirect after showing the message
      }, 40000); // Message display duration
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
        login(response.data.token); // Save token and update auth state
        navigate("/dashboard"); // Redirect to a protected route
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display message if available */}
      {message && <p className="alert alert-info">{message}</p>}

      {/* Toggle to choose between regular and creator login */}
      <div>
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

      {/* Form for both login types */}
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
  );
};

export default Login;
