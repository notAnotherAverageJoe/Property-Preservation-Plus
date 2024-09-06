import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "..//../utils/authService";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      console.log(response);
      // Redirect to login page on successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      // Display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
