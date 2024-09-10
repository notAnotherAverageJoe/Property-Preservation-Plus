import React, { useState, useEffect } from "react";
import axios from "axios";

function BudgetForecast() {
  const [budget, setBudget] = useState(0);
  const [units, setUnits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
        setError("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      const fetchData = async () => {
        try {
          const unitResponse = await axios.get(
            `http://localhost:3000/api/properties/${selectedProperty}/units`
          );
          const transactionResponse = await axios.get(
            `http://localhost:3000/api/properties/${selectedProperty}/financial-transactions`
          );

          setUnits(unitResponse.data);
          setTransactions(transactionResponse.data);

          console.log("Units:", unitResponse.data);
          console.log("Transactions:", transactionResponse.data);
        } catch (error) {
          console.error("Error fetching data", error);
          setError("Failed to fetch data");
        }
      };

      fetchData();
    }
  }, [selectedProperty]);

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  // Calculate total rent
  const totalRent = units.reduce((sum, unit) => {
    const rent = parseFloat(unit.rent_amount); // Adjust field name if needed
    return !isNaN(rent) ? sum + rent : sum;
  }, 0);

  // Calculate total transactions (including negatives)
  const totalTransactions = transactions.reduce((sum, transaction) => {
    const amount = parseFloat(transaction.amount);
    return !isNaN(amount) ? sum + amount : sum;
  }, 0);

  // Calculate forecast
  const forecast = budget + totalRent - totalTransactions;

  return (
    <div className="budget-forecast">
      <h2>Budget Forecast</h2>
      {error && <p className="error">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission if needed
        }}
      >
        <label htmlFor="property">Select Property:</label>
        <select
          id="property"
          value={selectedProperty || ""}
          onChange={handlePropertyChange}
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>

        <label htmlFor="budget">Enter Budget:</label>
        <input
          type="number"
          id="budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
        />
        {/* <button type="submit">Update Forecast</button> */}
      </form>

      {selectedProperty && (
        <div className="forecast-info">
          <h3>Forecast</h3>
          <p>
            <strong>Total Rent:</strong> ${totalRent.toFixed(2)}
          </p>
          <p>
            <strong>Total Transactions:</strong> ${totalTransactions.toFixed(2)}
          </p>
          <p>
            <strong>Budget:</strong> ${budget.toFixed(2)}
          </p>
          <p>
            <strong>Forecast:</strong> ${forecast.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default BudgetForecast;
