import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { hasFullAccess } from "../../utils/accessUtils"; // Import the utility function

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info from AuthContext

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

  // Handle Delete Property
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/properties/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete property");
        }

        // Update the state after deletion
        setProperties(properties.filter((property) => property.id !== id));
      } catch (error) {
        console.error("Error deleting property", error);
      }
    }
  };

  // Handle Edit Property
  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  // Access control checks
  const canEditOrDelete =
    user.access_level >= 3 || hasFullAccess(user.access_level);

  return (
    <div>
      <h1>Properties List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <Link to={`/property/${property.id}`}>
                {property.name} - {property.address}
              </Link>
              {canEditOrDelete ? ( // Use the access control check
                <>
                  <button
                    onClick={() => handleEdit(property.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </>
              ) : null}
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
