// components/TransactionList.js
import React from "react";

const TransactionList = ({
  transactions,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) => {
  return (
    <ul>
      {transactions.map((trans) => (
        <li key={trans.id}>
          <strong>{trans.type}</strong>: ${trans.amount} on{" "}
          {new Date(trans.transaction_date).toLocaleDateString()}
          <br />
          Description: {trans.description}
          <br />
          {(canEdit || canDelete) && (
            <>
              {canEdit && <button onClick={() => onEdit(trans)}>Edit</button>}
              {canDelete && (
                <button onClick={() => onDelete(trans.id)}>Delete</button>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
