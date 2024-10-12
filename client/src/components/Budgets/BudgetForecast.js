import React, { useState, useEffect } from "react";
import axios from "axios";
import UnitRentDisplay from "./UnitRentDisplay";
import FinancialTransactionDisplay from "./FinancialTransactionDisplay";
import "../styles/BudgetForecast.css";

function BudgetForecast() {
  const [budget, setBudget] = useState(0); // State for the budget
  const [units, setUnits] = useState([]); // State for storing unit data
  const [transactions, setTransactions] = useState([]); // State for storing financial transactions
  const [properties, setProperties] = useState([]); // State for storing property data
  const [selectedProperty, setSelectedProperty] = useState(null); // State for the selected property
  const [error, setError] = useState(null); // State for error messages

  // Effect hook to fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Make a GET request to fetch properties
        const response = await axios.get(
          "http://localhost:3000/api/properties"
        );
        setProperties(response.data); // Set the fetched properties to state
      } catch (error) {
        console.error("Error fetching properties", error); // Log error to console
        setError("Failed to fetch properties"); // Set error message
      }
    };

    fetchProperties(); // Call the fetch function
  }, []); // Empty dependency array to run effect once on mount

  // Effect hook to fetch data for the selected property
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProperty) return; // Return if no property is selected

      try {
        // Fetch units and transactions for the selected property
        const unitResponse = await axios.get(
          `http://localhost:3000/api/properties/${selectedProperty}/units`
        );
        const transactionResponse = await axios.get(
          `http://localhost:3000/api/properties/${selectedProperty}/financial-transactions`
        );

        setUnits(unitResponse.data || []); // Set units to state
        setTransactions(transactionResponse.data || []); // Set transactions to state
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Data not found:", error); // Log 404 error
          setError("No data available for the selected property."); // Set error message for missing data
          setUnits([]); // Reset units state
          setTransactions([]); // Reset transactions state
        } else {
          console.error("Error fetching data", error); // Log other errors
          setError("Failed to fetch data"); // Set generic error message
        }
      }
    };

    fetchData(); // Call the fetch function when selectedProperty changes
  }, [selectedProperty]); // Dependency array includes selectedProperty

  // Handler for changing the selected property
  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value); // Update selected property based on user input
  };

  // Calculate the budget forecast
  const forecast =
    budget + // Start with the budget
    units.reduce((sum, unit) => {
      const rent = parseFloat(unit.rent_amount); // Parse the rent amount
      return !isNaN(rent) ? sum + rent : sum; // Add rent to sum if valid
    }, 0) - // Sum of unit rents
    transactions.reduce((sum, transaction) => {
      const amount = parseFloat(transaction.amount); // Parse the transaction amount
      return !isNaN(amount) ? sum + amount : sum; // Subtract transaction amount from sum if valid
    }, 0); // Sum of transaction amounts

  return (
    <div className="budget-forecast">
      {" "}
      {/* Main container for the budget forecast */}
      <h2>Budget Forecast</h2> {/* Heading for the budget forecast section */}
      {error && <p className="error">{error}</p>}{" "}
      {/* Display error message if exists */}
      <form onSubmit={(e) => e.preventDefault()}>
        {" "}
        {/* Form for selecting property and budget */}
        <label htmlFor="property">Select Property:</label>
        <select
          id="property"
          value={selectedProperty || ""} // Set selected value or empty string
          onChange={handlePropertyChange} // Handle property selection change
        >
          <option value="">Select a property</option> {/* Default option */}
          {properties.map(
            (
              property // Map through properties to create options
            ) => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            )
          )}
        </select>
        <label htmlFor="budget">Enter Budget:</label>
        <input
          type="number"
          id="budget"
          value={budget} // Set the input value to the budget state
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)} // Update budget state on input change
        />
      </form>
      {selectedProperty && ( // Render additional info if a property is selected
        <div className="forecast-info">
          <UnitRentDisplay units={units} /> {/* Display unit rents */}
          <FinancialTransactionDisplay transactions={transactions} />{" "}
          {/* Display financial transactions */}
          <div className="summary-box">
            {" "}
            {/* Summary of budget and forecast */}
            <p>
              <strong>Budget:</strong> ${budget.toFixed(2)}{" "}
              {/* Display formatted budget */}
            </p>
            <p>
              <strong>Forecast:</strong> ${forecast.toFixed(2)}{" "}
              {/* Display formatted forecast */}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetForecast;
