import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Adjust as necessary

// Register new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
};

export { register, login, logout };
