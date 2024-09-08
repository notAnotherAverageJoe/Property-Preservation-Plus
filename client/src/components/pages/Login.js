import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isCreator
        ? "http://localhost:3000/api/auth/creator-login"
        : "http://localhost:3000/api/auth/login";

      const response = await axios.post(endpoint, { email, password });

      if (response.data.token) {
        const { token, accessLevel } = response.data;
        login(token); // Save token and update auth state

        // Redirect based on access level
        switch (accessLevel) {
          case 1:
            navigate("/dashboard/level1");
            break;
          case 2:
            navigate("/dashboard/level2");
            break;
          case 3:
            navigate("/dashboard/level3");
            break;
          case 4:
            navigate("/dashboard/level4");
            break;
          case 5:
            navigate("/dashboard/level5");
            break;
          default:
            navigate("/dashboard"); // Default fallback dashboard
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
