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

  // Access control logic
  const canCreate = user.access_level >= 2; // Access level 2+ can create properties
  const canEditOrDelete = (property) => {
    return (
      user.access_level >= 4 || // Full access for level 4+
      (user.access_level === 3 && property.created_by === user.id) || // Level 3 can edit/delete their own properties
      hasFullAccess(user.access_level) // Check if user has full access
    );
  };

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
              {canEditOrDelete(property) && ( // Check permissions for edit/delete
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
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found.</p>
      )}

      {canCreate && ( // Only show the "Add Property" button if user can create properties
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/create-property")}>
            Add New Property
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default PropertiesList;
