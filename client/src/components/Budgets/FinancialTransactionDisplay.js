import React from "react";
import "../styles/FinancialTransactionDisplay.css";

// The FinancialTransactionDisplay component
// is designed to display the total amount of financial transactions.
function FinancialTransactionDisplay({ transactions }) {
  // Calculate the total amount of transactions
  const totalTransactions = transactions.length
    ? transactions.reduce((sum, transaction) => {
        // Parse the amount from each transaction
        const amount = parseFloat(transaction.amount);
        // Check if the parsed amount is a valid number
        return !isNaN(amount) ? sum + amount : sum; // Add to the sum if valid, otherwise return the current sum
      }, 0) // Start the sum at 0
    : 0; // If there are no transactions, set the total to 0

  return (
    <div className="financial-transaction-display">
      {" "}
      <h3 id="ExpensesTitle">Total Property Expenses</h3>
      <p>${totalTransactions.toFixed(2) || "No transactions available"}</p>{" "}
      {/* Display the total formatted to 2 decimal places or a message if there are no transactions */}
    </div>
  );
}

export default FinancialTransactionDisplay; // Export the component standard
