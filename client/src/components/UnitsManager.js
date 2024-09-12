import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { hasFullAccess } from "../utils/accessUtils";
import SearchBar from "./SearchBar"; // Import SearchBar component

const UnitsManager = ({ propertyId }) => {
  const { token, user } = useAuth();
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    unit_number: "",
    type: "",
    rent_amount: "",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const unitsPerPage = 5; // Define how many units per page

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
        await axios.put(
          `http://localhost:3000/api/units/${selectedUnit.id}`,
          formData
        );
      } else {
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
  const isCreator = user.is_owner !== false;
  const accessLevel = user.access_level || 0;

  const canView = isCreator || accessLevel >= 1;
  const canCreate = canView || accessLevel >= 2;
  const canEdit = accessLevel >= 3 || isCreator;
  const canDelete = accessLevel >= 4 || hasFullAccess(accessLevel) || isCreator;

  // Filter units by search term (both unit_number and type)
  const filteredUnits = units.filter(
    (unit) =>
      unit.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Manage Units for Property {propertyId}</h2>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholderText="Search units (1A1, 6B3, etc..."
      />

      {canCreate && (
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

      {canView ? (
        <>
          <ul>
            {currentUnits.map((unit) => (
              <li key={unit.id} className="unit-item">
                <Link
                  to={`/properties/${propertyId}/units/${unit.id}/requests`}
                  className="unit-link"
                >
                  {unit.unit_number} ({unit.type}) - ${unit.rent_amount}
                </Link>
                {canEdit && (
                  <button onClick={() => handleEdit(unit)}>Edit</button>
                )}
                {canDelete && (
                  <button onClick={() => handleDelete(unit.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination-container">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredUnits.length / unitsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>You do not have permission to view units for this property.</p>
      )}
    </div>
  );
};

export default UnitsManager;
