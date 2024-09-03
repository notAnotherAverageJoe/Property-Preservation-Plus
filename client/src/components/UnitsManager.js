// UnitsManager.js
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Import your AuthContext

const UnitsManager = ({ propertyId }) => {
  const { token } = useAuth();
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
  }, [propertyId, token]); // Add token to dependencies

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

  return (
    <div>
      <h2>Manage Units for Property {propertyId}</h2>
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
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>
            {unit.unit_number} ({unit.type}) - ${unit.rent_amount}{" "}
            <button onClick={() => handleEdit(unit)}>Edit</button>{" "}
            <button onClick={() => handleDelete(unit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitsManager;
