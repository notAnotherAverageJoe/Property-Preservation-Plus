import React from "react";
import { Link } from "react-router-dom";
import "../pagesCSS/Home.css"; // Ensure this path is correct

const Main = () => {
  return (
    <div className="containerHome">
      <div className="triangleBackground"></div>
      <h1>Welcome to </h1>
      <h1>Property Preservation Plus!</h1>
      <h2>The Only Property Management System You'll Ever Need!</h2>
      <h3>info to be added</h3>
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
