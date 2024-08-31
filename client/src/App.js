import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreateCompany from "./components/CreateCompany";
import withAuth from "./components/withAuth"; // Import the HOC
import Navbar from "./components/Navbar";
import "./components/Navbar.css";

// Wrap the Dashboard component with the withAuth HOC
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedCreateCompany = withAuth(CreateCompany);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-company" element={<ProtectedCreateCompany />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
