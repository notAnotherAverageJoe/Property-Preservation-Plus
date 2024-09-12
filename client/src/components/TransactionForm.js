// components/TransactionForm.js
import React from "react";
import "./styles/TransactionForm.css";

const TransactionForm = ({
  transaction,
  onChange,
  onSubmit,
  editingTransactionId,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="type"
        value={transaction.type}
        onChange={onChange}
        placeholder="Type"
      />
      <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={onChange}
        placeholder="Amount"
      />
      <input
        type="text"
        name="description"
        value={transaction.description}
        onChange={onChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="transactionDate"
        value={transaction.transactionDate}
        onChange={onChange}
        placeholder="Transaction Date"
      />
      <button type="submit">
        {editingTransactionId ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
