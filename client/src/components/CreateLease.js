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
  });

  const handleInputChange = (e) => {
    setLeaseData({ ...leaseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !leaseData.unit_id ||
      !leaseData.tenant_id ||
      !leaseData.start_date ||
      !leaseData.end_date ||
      !leaseData.rent_amount
    ) {
      alert("All fields are required.");
      return;
    }

    if (leaseData.start_date > leaseData.end_date) {
      alert("End date must be after the start date.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/api/leases", leaseData);
      alert("Lease created successfully");
      setLeaseData({
        unit_id: "",
        tenant_id: "",
        start_date: "",
        end_date: "",
        rent_amount: "",
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
        <button type="submit">Create Lease</button>
      </form>
    </div>
  );
};

export default CreateLease;
