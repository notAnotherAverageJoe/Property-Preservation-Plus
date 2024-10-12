import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateLease = ({ onLeaseCreated }) => {
  const [leaseData, setLeaseData] = useState({
    unit_id: "",
    tenant_id: "",
    start_date: "",
    end_date: "",
    rent_amount: "",
    company_id: "", // This will be set automatically
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with wherever you're storing the token
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
      const companyIdFromToken = decodedToken.company_id;
      setLeaseData((prevData) => ({
        ...prevData,
        company_id: companyIdFromToken,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rent_amount" && value !== "") {
      // Ensure rent_amount is a valid number
      const rentValue = value.replace(/[^0-9.]/g, ""); // Allow only digits and dots
      setLeaseData({ ...leaseData, [name]: rentValue });
    } else {
      setLeaseData({ ...leaseData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled except company_id (which is auto-filled)
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

    // Format the data for submission
    const formattedLeaseData = {
      ...leaseData,
      unit_id: Number(leaseData.unit_id),
      tenant_id: Number(leaseData.tenant_id),
      rent_amount: parseFloat(leaseData.rent_amount),
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
        company_id: leaseData.company_id, // Keep the company_id from the token
      });

      // Call the callback function to notify parent component
      if (onLeaseCreated) {
        onLeaseCreated();
      }
    } catch (err) {
      console.error(err);

      // Handle foreign key errors or other validation issues
      if (err.response && err.response.data && err.response.data.detail) {
        const errorMessage = err.response.data.detail;
        if (errorMessage.includes("violates foreign key constraint")) {
          if (errorMessage.includes("leases_tenant_id_fkey")) {
            alert("Invalid tenant ID. Please check and try again.");
          } else if (errorMessage.includes("leases_unit_id_fkey")) {
            alert("Invalid unit ID. Please check and try again.");
          } else {
            alert(
              "Failed to create lease. Please check your input and try again."
            );
          }
        } else {
          alert(
            "Failed to create lease. Please check your input and try again."
          );
        }
      } else {
        alert(
          "Failed to create lease. Please check your input and try again. Valid Tenant ID and Valid Unit ID required."
        );
      }
    }
  };

  return (
    <div>
      <h3>Create a Lease</h3>
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
          placeholder="Start Date"
          name="start_date"
          value={leaseData.start_date}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          placeholder="End Date"
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
          min="0"
          step="0.01"
        />
        {/* The company_id input field is removed since it is auto-filled */}
        <button type="submit">Create Lease</button>
      </form>
    </div>
  );
};

export default CreateLease;
