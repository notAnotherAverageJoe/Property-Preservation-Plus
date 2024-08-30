// Dashboard.js or wherever appropriate
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-company">Create a New Company</Link>
      {/* Other dashboard content */}
    </div>
  );
}

export default Dashboard;
