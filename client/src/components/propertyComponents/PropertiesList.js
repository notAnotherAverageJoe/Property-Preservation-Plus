import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// Import the utility function if needed
// import { hasFullAccess } from "../../utils/accessUtils";

function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info from AuthContext

  console.log("User from AuthContext:", user); // Debugging statement

  const isCreator = user.is_owner !== false; // Determine if user is a creator
  const accessLevel = user.access_level || 5;

  console.log("Is Creator:", isCreator); // Debugging statement
  console.log("Access Level:", accessLevel); // Debugging statement

  // Determine if the user can view properties
  const canView = isCreator || accessLevel >= 1;

  // Determine if the user can create properties
  const canCreate = accessLevel >= 2;

  // Determine if the user can edit or delete a property
  const canEditOrDelete = (property) => {
    return (
      isCreator || // Creators always have permissions
      accessLevel >= 4 || // Level 4+ can edit/delete
      // hasFullAccess(accessLevel) || // Check if user has full access
      (accessLevel === 3 && property.created_by === user.id) // Level 3 can edit/delete their own properties
    );
  };

  useEffect(() => {
    const fetchProperties = async () => {
      if (!canView) {
        console.error("User does not have permission to view properties");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      console.log("Fetching properties with token:", token); // Debugging statement

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
  }, [canView]);

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
