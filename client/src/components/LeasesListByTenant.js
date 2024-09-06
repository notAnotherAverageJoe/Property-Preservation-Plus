import React, { useState } from "react";
import axios from "axios";

const LeasesListByTenant = () => {
  const [tenantId, setTenantId] = useState("");
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setTenantId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tenantId) {
      alert("Please enter a tenant ID.");
      return;
    }

    setLoading(true);
    setSubmitted(true);

    try {
      const url = `http://localhost:3000/api/leases?tenant_id=${tenantId}`;
      console.log("Fetching leases from URL:", url); // Log the URL
      const response = await axios.get(url);
      setLeases(response.data);
    } catch (error) {
      setError("Error fetching leases");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Leases by Tenant</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tenantId">Tenant ID:</label>
        <input
          type="text"
          id="tenantId"
          value={tenantId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Fetch Leases</button>
      </form>

      {submitted && (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {leases.length > 0 ? (
            <ul>
              {leases.map((lease) => (
                <li key={lease.id}>
                  Unit ID: {lease.unit_id}, Tenant ID: {lease.tenant_id}, Start
                  Date: {lease.start_date}, End Date: {lease.end_date}, Rent
                  Amount: {lease.rent_amount}, Status: {lease.status}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No leases found for this tenant.</p>
          )}
        </>
      )}
    </div>
  );
};

export default LeasesListByTenant;
