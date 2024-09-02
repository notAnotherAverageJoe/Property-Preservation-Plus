import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";

function PropertyDetail({ propertyId }) {
  const [transactions, setTransactions] = useState([]);

  // Function to handle adding a new transaction to the state
  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      {/* Other components and details */}
      <h3>Financial Transactions</h3>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <p>
            {transaction.type}: ${transaction.amount}
          </p>
          <p>{transaction.description}</p>
          <p>{transaction.transaction_date}</p>
        </div>
      ))}

      <AddTransactionForm
        propertyId={propertyId}
        onTransactionAdded={handleTransactionAdded}
      />
    </div>
  );
}

export default PropertyDetail;
