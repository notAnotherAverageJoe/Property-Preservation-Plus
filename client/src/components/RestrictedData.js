import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const RestrictedData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/restricted-data",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching data"
        );
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Restricted Data</h1>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h1>Restricted area level 3</h1>
          {/* Render your restricted data here */}
        </div>
      )}
    </div>
  );
};

export default RestrictedData;
