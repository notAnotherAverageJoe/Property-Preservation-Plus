import React, { useState } from "react";
import axios from "axios";

const LeasesListByTenant = () => {
  const [tenantId, setTenantId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTenantInputChange = (e) => setTenantId(e.target.value);
  const handleCompanyInputChange = (e) => setCompanyId(e.target.value);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const toISODate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!tenantId || !companyId) {
      alert("Please enter both tenant ID and company ID.");
      return;
    }

    setLoading(true);
    setSubmitted(true);

    try {
      const url = `http://localhost:3000/api/leases?tenant_id=${tenantId}&company_id=${companyId}`;
      const response = await axios.get(url);
      setLeases(response.data);
    } catch (error) {
      setError("Error fetching leases");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLease = async (leaseId, updatedLease) => {
    try {
      const updatedLeaseWithISO = {
        ...updatedLease,
        start_date: toISODate(updatedLease.start_date),
        end_date: toISODate(updatedLease.end_date),
      };
      await axios.put(
        `http://localhost:3000/api/leases/${leaseId}`,
        updatedLeaseWithISO
      );
      alert("Lease updated successfully");
      fetchLeases(); // Use a separate function to fetch leases
    } catch (error) {
      setError("Error updating lease");
    }
  };

  const fetchLeases = async () => {
    if (!tenantId || !companyId) return;

    setLoading(true);
    setSubmitted(true);

    try {
      const url = `http://localhost:3000/api/leases?tenant_id=${tenantId}&company_id=${companyId}`;
      const response = await axios.get(url);
      setLeases(response.data);
    } catch (error) {
      setError("Error fetching leases");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLease = async (leaseId) => {
    try {
      await axios.delete(`http://localhost:3000/api/leases/${leaseId}`);
      alert("Lease deleted successfully");
      setLeases(leases.filter((lease) => lease.id !== leaseId));
    } catch (error) {
      setError("Error deleting lease");
    }
  };

  const handleLeaseChange = (e, leaseId, field) => {
    const updatedLeases = leases.map((lease) => {
      if (lease.id === leaseId) {
        return { ...lease, [field]: e.target.value };
      }
      return lease;
    });
    setLeases(updatedLeases);
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
          onChange={handleTenantInputChange}
          required
        />

        <label htmlFor="companyId">Company ID:</label>
        <input
          type="text"
          id="companyId"
          value={companyId}
          onChange={handleCompanyInputChange}
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
                  <label>
                    Unit ID:
                    <input
                      type="text"
                      value={lease.unit_id}
                      onChange={(e) =>
                        handleLeaseChange(e, lease.id, "unit_id")
                      }
                    />
                  </label>

                  <label>
                    Start Date:
                    <input
                      type="date"
                      value={formatDate(lease.start_date)}
                      onChange={(e) =>
                        handleLeaseChange(e, lease.id, "start_date")
                      }
                    />
                  </label>

                  <label>
                    End Date:
                    <input
                      type="date"
                      value={formatDate(lease.end_date)}
                      onChange={(e) =>
                        handleLeaseChange(e, lease.id, "end_date")
                      }
                    />
                  </label>

                  <label>
                    Rent Amount:
                    <input
                      type="number"
                      value={lease.rent_amount}
                      onChange={(e) =>
                        handleLeaseChange(e, lease.id, "rent_amount")
                      }
                    />
                  </label>

                  <label>
                    Status:
                    <select
                      value={lease.status}
                      onChange={(e) => handleLeaseChange(e, lease.id, "status")}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </label>

                  <button onClick={() => handleUpdateLease(lease.id, lease)}>
                    Update Lease
                  </button>
                  <button onClick={() => handleDeleteLease(lease.id)}>
                    Delete Lease
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No leases found for this tenant and company.</p>
          )}
        </>
      )}
    </div>
  );
};

export default LeasesListByTenant;
