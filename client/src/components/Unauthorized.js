import React from "react";
import { Link } from "react-router-dom";
import "./styles/Unathorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-box">
        <h1>Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
        <Link to="/login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
