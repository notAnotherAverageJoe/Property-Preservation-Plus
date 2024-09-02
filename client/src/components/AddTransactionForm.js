import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AddTransactionForm() {
  const { token } = useAuth();
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    type: "",
    amount: "",
    description: "",
    transactionDate: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties/${id}/financial-transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched transactions:", response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch transactions:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting transaction:", transaction);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/properties/${id}/financial-transactions`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions((prev) => [...prev, response.data]);
      console.log("Transaction added:", response.data);
    } catch (error) {
      console.error(
        "Failed to add transaction:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.error("No date string provided.");
      return "No Date Available";
    }

    console.log("Raw date string:", dateString);
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error("Invalid Date encountered:", dateString);
      return "Invalid Date";
    }

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
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

      {/* Render the list of transactions */}
      <h2>Transactions</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <ul>
          {transactions.map((trans) => (
            <li key={trans.id}>
              <strong>{trans.type}</strong>: ${trans.amount} on{" "}
              {formatDate(trans.transaction_date)} {/* Use correct field */}
              <br />
              Description: {trans.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

export default AddTransactionForm;
