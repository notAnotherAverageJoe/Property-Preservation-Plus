import { React } from "react";
import "../styles/TransactionForm.css";

const TransactionForm = ({
  transaction,
  onChange,
  onSubmit,
  editingTransactionId,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate the amount field no need fir negatives the system always subtracts
    if (name === "amount") {
      // Allow only numeric input (including decimals)
      if (/^\d*\.?\d*$/.test(value)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate amount field
    if (!/^\d*\.?\d*$/.test(transaction.amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    // Proceed with form submission
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="type"
        value={transaction.type}
        onChange={handleInputChange}
        placeholder="Type"
      />
      <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleInputChange}
        placeholder="Amount"
        min="0"
        step="0.01"
      />
      <input
        type="text"
        name="description"
        value={transaction.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="transactionDate"
        value={transaction.transactionDate}
        onChange={handleInputChange}
        placeholder="Transaction Date"
      />
      <button type="submit">
        {editingTransactionId ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
