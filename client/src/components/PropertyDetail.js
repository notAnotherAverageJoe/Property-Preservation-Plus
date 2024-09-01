import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Transaction from "./Transaction"; // Import the Transaction component

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch property details
        const propertyResponse = await fetch(
          `http://localhost:3000/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!propertyResponse.ok) {
          throw new Error("Failed to fetch property details");
        }

        const propertyData = await propertyResponse.json();
        setProperty(propertyData);

        // Fetch financial transactions related to the property
        const transactionsResponse = await fetch(
          `http://localhost:3000/api/properties/${id}/financial-transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!transactionsResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData); // Assuming you have state for transactions
      } catch (error) {
        setError(error.message);
        console.error("Error fetching property details or transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {property ? (
        <div>
          <h1>{property.name}</h1>
          <p>{property.address}</p>
          {/* Add more property details as needed */}

          <h2>Transactions</h2>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <p>No transactions available</p>
          )}
        </div>
      ) : (
        <p>No property details available</p>
      )}
    </div>
  );
}

export default PropertyDetail;
