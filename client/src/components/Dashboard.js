import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  // Fetch the company data when the component mounts
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await fetch("http://localhost:3000/api/user/company", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company data", error);
      }
    };

    fetchCompany();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-company">Create a New Company</Link>
      <Link to="/create-property">Create a New Property</Link>

      {/* Render company data if it exists */}
      {company ? (
        <div>
          <h2>Company Information</h2>
          <p>
            <strong>Name:</strong> {company.name}
          </p>
          <p>
            <strong>Address:</strong> {company.address}
          </p>
        </div>
      ) : (
        <p>No company information available. Please create a company.</p>
      )}
    </div>
  );
}

export default Dashboard;
