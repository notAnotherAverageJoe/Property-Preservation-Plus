import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Conditionally render the "Create a New Company" button if no company exists */}
      {!company && !loading && (
        <Link to="/create-company">Create a New Company</Link>
      )}

      {/* Render additional links and company data if a company exists */}
      {company && (
        <>
          <Link to="/create-property">Create a New Property</Link>
          <Link to="/properties">All Properties</Link>

          <div>
            <h2>Company Information</h2>
            <p>
              <strong>Name:</strong> {company.name}
            </p>
            <p>
              <strong>Address:</strong> {company.address}
            </p>
          </div>
        </>
      )}

      {/* Show a loading message while fetching data */}
      {loading && <p>Loading...</p>}

      {/* Show a message if no company exists after loading is complete */}
      {!company && !loading && (
        <p>No company information available. Please create a company.</p>
      )}
    </div>
  );
}

export default Dashboard;
