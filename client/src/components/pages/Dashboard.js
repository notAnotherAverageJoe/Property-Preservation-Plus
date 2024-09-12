import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Weather from "../WeatherAPI/Weather";
import "../pagesCSS/Dashboard.css";

function Dashboard() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/user/company", {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {!company && !loading && (
        <Link to="/create-company" className="button-link">
          Create a New Company
        </Link>
      )}

      {company && (
        <>
          <Link to="/properties" className="button-link">
            All Properties
          </Link>
          <Link to="/tenants" className="button-link">
            Tenants
          </Link>
          <Link to="/leases-by-tenant/:tenantId" className="button-link">
            Manage Leases
          </Link>

          <Link to="/dashboard/roles" className="button-link">
            Role Management
          </Link>
          <Link to="/create-user" className="button-link">
            Create Company User
          </Link>
          <Link to="/budget-forecast" className="button-link">
            Budget Forecast
          </Link>

          <div>
            <h2>Company Information</h2>
            <p>
              <strong>Name:</strong> {company.name}
            </p>
            <p>
              <strong>Address:</strong> {company.address}
            </p>
            <p>
              <strong>Company ID:</strong> {company.id}
            </p>
          </div>
        </>
      )}

      {loading && <p>Loading...</p>}

      {!company && !loading && (
        <p>No company information available. Please create a company.</p>
      )}

      {/* Weather Component */}
      <Weather />
    </div>
  );
}

export default Dashboard;
