import React, { useState } from "react";

function CreateCompany() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      const response = await fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({ name, address }),
      });

      if (!response.ok) {
        throw new Error("Failed to create company");
      }

      const data = await response.json();
      console.log("Company created:", data);
      // Handle successful creation (e.g., redirect or show success message)
    } catch (error) {
      console.error("Failed to create company", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Company</button>
    </form>
  );
}

export default CreateCompany;
