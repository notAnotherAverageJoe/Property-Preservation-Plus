import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://localhost:3000/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const data = await response.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching property details", error);
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
        </div>
      ) : (
        <p>No property details available</p>
      )}
    </div>
  );
}

export default PropertyDetail;
