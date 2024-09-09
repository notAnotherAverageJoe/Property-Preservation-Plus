import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function CreateProperty() {
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [companyId, setCompanyId] = useState(""); // Add state for companyId
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info from AuthContext

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    } else {
      console.error("Company ID not found in localStorage");
    }
  }, []);

  // Access control: Check if user has at least access level 2
  useEffect(() => {
    if (user.access_level < 2) {
      console.error("Insufficient access level to create properties");
      navigate("/dashboard"); // Redirect to dashboard or any other page
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!companyId) {
      console.error("No company ID found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: propertyName,
          address,
          company_id: companyId, // Use the retrieved companyId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create property");
      }

      const data = await response.json();
      console.log("Property created:", data);

      navigate("/properties");
    } catch (error) {
      console.error("Error creating property", error);
    }
  };

  return (
    <div>
      <h1>Create New Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          placeholder="Property Name"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <button type="submit">Create Property</button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default CreateProperty;
