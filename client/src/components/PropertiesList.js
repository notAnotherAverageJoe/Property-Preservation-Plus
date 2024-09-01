import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3000/api/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Properties List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              {property.name} - {property.address}
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}
      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default PropertiesList;
