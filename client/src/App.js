import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import withAuth from "./components/withAuth"; // Import the HOC
import Navbar from "./components/Navbar";
import "./components/Navbar.css";

// Wrap the Dashboard component with the withAuth HOC
const ProtectedDashboard = withAuth(Dashboard);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
