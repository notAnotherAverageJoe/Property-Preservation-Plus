import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateProperty() {
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [companyId, setCompanyId] = useState(""); // Add state for companyId
  const navigate = useNavigate();

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    } else {
      console.error("Company ID not found in localStorage");
    }
  }, []);

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
