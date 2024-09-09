import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { hasFullAccess } from "../../utils/accessUtils"; // Import your access utility function

function AddTransactionForm() {
  const { token, user } = useAuth();
  const { id } = useParams();
  const [transaction, setTransaction] = useState({
    type: "",
    amount: "",
    description: "",
    transactionDate: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTransactionId, setEditingTransactionId] = useState(null);

  // Determine access permissions
  const isCreator = user.is_owner !== false; // Check if user is not an owner
  const accessLevel = user.access_level || 0; // Default to 0 if access_level is undefined

  const canView = isCreator || accessLevel >= 1; // Allow viewing for access level 1 or higher
  const canCreate = canView || accessLevel >= 2; // Allow creating transactions for access level 2 or higher
  const canEdit = accessLevel >= 3; // Allow editing for access level 3 or higher
  const canDelete = accessLevel >= 4 || hasFullAccess(accessLevel); // Allow deleting only for access level 4 or full access

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

    if (canView) {
      fetchTransactions();
    }
  }, [id, token, canView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTransactionId) {
        // Update existing transaction
        const response = await axios.put(
          `http://localhost:3000/api/properties/${id}/financial-transactions/${editingTransactionId}`,
          transaction,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTransactions((prev) =>
          prev.map((trans) =>
            trans.id === editingTransactionId ? response.data : trans
          )
        );
        setEditingTransactionId(null);
      } else {
        // Add new transaction
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
      }

      setTransaction({
        type: "",
        amount: "",
        description: "",
        transactionDate: "",
      });
    } catch (error) {
      console.error(
        "Failed to save transaction:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = (transaction) => {
    setTransaction({
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      transactionDate: transaction.transaction_date.split("T")[0], // Format date for input field
    });
    setEditingTransactionId(transaction.id);
  };

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/properties/${id}/financial-transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== transactionId)
      );
    } catch (error) {
      console.error(
        "Failed to delete transaction:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No Date Available";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {canView ? (
        <>
          {canCreate && (
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
              <button type="submit">
                {editingTransactionId
                  ? "Update Transaction"
                  : "Add Transaction"}
              </button>
            </form>
          )}

          <h2>Transactions</h2>
          {loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <ul>
              {transactions.map((trans) => (
                <li key={trans.id}>
                  <strong>{trans.type}</strong>: ${trans.amount} on{" "}
                  {formatDate(trans.transaction_date)}
                  <br />
                  Description: {trans.description}
                  <br />
                  {(canEdit || canDelete) && (
                    <>
                      {canEdit && (
                        <button onClick={() => handleEdit(trans)}>Edit</button>
                      )}
                      {canDelete && (
                        <button onClick={() => handleDelete(trans.id)}>
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions found.</p>
          )}
        </>
      ) : (
        <p>You do not have permission to view this page.</p>
      )}
    </div>
  );
}

export default AddTransactionForm;
