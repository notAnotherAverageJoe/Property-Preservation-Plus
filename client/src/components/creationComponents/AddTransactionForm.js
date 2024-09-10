import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { hasFullAccess } from "../../utils/accessUtils";
import SearchBar from "../SearchBar"; // Import the SearchBar component

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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Determine access permissions
  const isCreator = user.is_owner !== false;
  const accessLevel = user.access_level || 0;

  const canView = isCreator || accessLevel >= 1;
  const canCreate = canView || accessLevel >= 2;
  const canEdit = accessLevel >= 3;
  const canDelete = accessLevel >= 4 || hasFullAccess(accessLevel);

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
      transactionDate: transaction.transaction_date.split("T")[0],
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

  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter(
    (trans) =>
      trans.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trans.amount.toString().includes(searchTerm) ||
      trans.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(trans.transaction_date).includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholderText="Search transactions..."
          />

          <h2>Transactions</h2>
          {loading ? (
            <p>Loading transactions...</p>
          ) : currentTransactions.length > 0 ? (
            <ul>
              {currentTransactions.map((trans) => (
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

          {/* Pagination Controls */}
          <nav>
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(
                  filteredTransactions.length / transactionsPerPage
                ),
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
          </nav>
        </>
      ) : (
        <p>You do not have permission to view this page.</p>
      )}
    </div>
  );
}

export default AddTransactionForm;
