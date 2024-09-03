import React, { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import UnitsManager from "./UnitsManager";
import { useParams } from "react-router-dom";

function PropertyDetail() {
  const { id: propertyId } = useParams();
  const [transactions, setTransactions] = useState([]);

  // Function to handle adding a new transaction to the state
  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div>
      {/* Section for managing units */}
      <h2>Units Management</h2>
      <UnitsManager propertyId={propertyId} />

      {/* Section for financial transactions */}
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
