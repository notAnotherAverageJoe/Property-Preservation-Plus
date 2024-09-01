import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import CreateCompany from "./components/CreateCompany";
import PropertiesList from "./components/PropertiesList";
import CreateProperty from "./components/CreateProperty";
import withAuth from "./components/withAuth";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import { AuthProvider } from "./contexts/AuthContext";

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedCreateCompany = withAuth(CreateCompany);
const ProtectedPropertiesList = withAuth(PropertiesList);
const ProtectedCreateProperty = withAuth(CreateProperty);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-company" element={<ProtectedCreateCompany />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/properties" element={<ProtectedPropertiesList />} />
          <Route
            path="/create-property"
            element={<ProtectedCreateProperty />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
