// src/components/CreateLease.js
import React, { useState } from "react";
import axios from "axios";

const CreateLease = () => {
  const [leaseData, setLeaseData] = useState({
    unit_id: "",
    tenant_id: "",
    start_date: "",
    end_date: "",
    rent_amount: "",
    company_id: "", // Add this field
  });

  const handleInputChange = (e) => {
    setLeaseData({ ...leaseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !leaseData.unit_id ||
      !leaseData.tenant_id ||
      !leaseData.start_date ||
      !leaseData.end_date ||
      !leaseData.rent_amount ||
      !leaseData.company_id
    ) {
      alert("All fields are required.");
      return;
    }

    // Format the data for submission
    const formattedLeaseData = {
      ...leaseData,
      unit_id: Number(leaseData.unit_id),
      tenant_id: Number(leaseData.tenant_id),
      rent_amount: parseFloat(leaseData.rent_amount), // Ensures rent_amount is treated as a float
      company_id: Number(leaseData.company_id),
    };

    try {
      await axios.post("http://localhost:3000/api/leases", formattedLeaseData);
      alert("Lease created successfully");

      // Reset form fields after successful submission
      setLeaseData({
        unit_id: "",
        tenant_id: "",
        start_date: "",
        end_date: "",
        rent_amount: "",
        company_id: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create lease");
    }
  };

  return (
    <div>
      <h1>Create a Lease</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="unit_id"
          value={leaseData.unit_id}
          onChange={handleInputChange}
          placeholder="Unit ID"
          required
        />
        <input
          type="text"
          name="tenant_id"
          value={leaseData.tenant_id}
          onChange={handleInputChange}
          placeholder="Tenant ID"
          required
        />
        <input
          type="date"
          name="start_date"
          value={leaseData.start_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="end_date"
          value={leaseData.end_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="rent_amount"
          value={leaseData.rent_amount}
          onChange={handleInputChange}
          placeholder="Rent Amount"
          required
        />
        {/* Add Company ID input */}
        <input
          type="text"
          name="company_id"
          value={leaseData.company_id}
          onChange={handleInputChange}
          placeholder="Company ID"
          required
        />
        <button type="submit">Create Lease</button>
      </form>
    </div>
  );
};

export default CreateLease;
