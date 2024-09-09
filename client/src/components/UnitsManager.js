import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { hasFullAccess } from "../utils/accessUtils"; // Import the utility function

const UnitsManager = ({ propertyId }) => {
  const { token, user } = useAuth(); // Get user info and token from AuthContext
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    unit_number: "",
    type: "",
    rent_amount: "",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);

  // Set axios default headers for authentication
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchUnits = useCallback(async () => {
    try {
      if (!propertyId) {
        console.error("No propertyId provided");
        return;
      }
      const response = await axios.get(
        `http://localhost:3000/api/properties/${propertyId}/units`
      );
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  }, [propertyId, token]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUnit) {
        // Update unit
        await axios.put(
          `http://localhost:3000/api/units/${selectedUnit.id}`,
          formData
        );
      } else {
        // Create unit
        await axios.post(`http://localhost:3000/api/units`, {
          ...formData,
          property_id: propertyId,
        });
      }
      fetchUnits();
      setFormData({ unit_number: "", type: "", rent_amount: "" });
      setSelectedUnit(null);
    } catch (error) {
      console.error("Error saving unit:", error);
    }
  };

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setFormData({
      unit_number: unit.unit_number,
      type: unit.type,
      rent_amount: unit.rent_amount,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/units/${id}`);
      fetchUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  // Access control checks
  const isCreator = user.is_owner !== false; // Check if user is not an owner
  const accessLevel = user.access_level || 0; // Default to 0 if access_level is undefined

  const canView = isCreator || accessLevel >= 1; // Allow viewing for access level 1 or higher
  const canCreate = canView || accessLevel >= 2; // Allow creating units for access level 2 or higher
  const canEdit = accessLevel >= 3; // Allow editing for access level 3 or higher
  const canDelete = accessLevel >= 4 || hasFullAccess(accessLevel); // Allow deleting only for access level 4 or full access

  return (
    <div>
      <h2>Manage Units for Property {propertyId}</h2>
      {canCreate && ( // Conditionally render form for users with create access (level 2 or higher)
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="unit_number"
            placeholder="Unit Number"
            value={formData.unit_number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g., 1B1B)"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            type="number"
            name="rent_amount"
            placeholder="Rent Amount"
            value={formData.rent_amount}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {selectedUnit ? "Update Unit" : "Create Unit"}
          </button>
        </form>
      )}
      {canView ? ( // Only render units list for users who have at least view access
        <ul>
          {units.map((unit) => (
            <li key={unit.id}>
              <Link to={`/properties/${propertyId}/units/${unit.id}/requests`}>
                {unit.unit_number} ({unit.type}) - ${unit.rent_amount}
              </Link>{" "}
              {canEdit && ( // Conditionally render Edit button for users with edit access
                <button onClick={() => handleEdit(unit)}>Edit</button>
              )}
              {canDelete && ( // Conditionally render Delete button for users with delete access (level 4 or full access)
                <button onClick={() => handleDelete(unit.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>You do not have permission to view units for this property.</p>
      )}
    </div>
  );
};

export default UnitsManager;
