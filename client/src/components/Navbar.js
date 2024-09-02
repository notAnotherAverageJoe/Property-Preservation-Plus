import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token from localStorage or any other storage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-brand">PPP</div>
        <div
          className="toggle-button"
          onClick={() =>
            document.getElementById("nav-links").classList.toggle("active")
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className="nav-links" id="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogout} className="nav-button">
              Logout
            </Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
