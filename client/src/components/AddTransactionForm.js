import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the hook correctly

function AddTransactionForm() {
  const { token } = useAuth(); // Ensure this line retrieves the token
  const { id } = useParams(); // Extract the property id from the URL
  const [transaction, setTransaction] = useState({
    type: "",
    amount: "",
    description: "",
    transactionDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/properties/${id}/financial-transactions`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is passed
          },
        }
      );
      console.log("Transaction added:", response.data);
    } catch (error) {
      console.error(
        "Failed to add transaction:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="type"
        value={transaction.type}
        onChange={handleChange}
        placeholder="Type"
      />
      <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        placeholder="Amount"
      />
      <input
        type="text"
        name="description"
        value={transaction.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="transactionDate"
        value={transaction.transactionDate}
        onChange={handleChange}
        placeholder="Transaction Date"
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default AddTransactionForm;
