// src/pages/Main.js
import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <h2>
        <Link to="/login">Login</Link>
      </h2>
      <h2>
        <Link to="/register">Register</Link>
      </h2>
    </div>
  );
};

export default Main;
