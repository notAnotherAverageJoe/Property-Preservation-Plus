import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/admin-dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching data"
        );
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p>{error}</p>}
      {dashboardData && <div>{/* Render your dashboard data here */}</div>}
    </div>
  );
};

export default AdminDashboard;
