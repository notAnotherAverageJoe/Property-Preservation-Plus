import React, { useState, useEffect } from "react";
import axios from "axios";

const TenantsManager = () => {
  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    property_id: "", // Initialize as empty string
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTenants();
    fetchProperties();
  }, []);

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/tenants", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTenants(res.data);
    } catch (err) {
      console.error("Failed to fetch tenants:", err);
    }
  };

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const { id, first_name, last_name, email, phone, property_id } = formData;
    try {
      const token = localStorage.getItem("token");
      if (editing) {
        await axios.put(
          `http://localhost:3000/api/tenants/${id}`,
          { first_name, last_name, email, phone, property_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditing(false);
      } else {
        await axios.post(
          "http://localhost:3000/api/tenants",
          { first_name, last_name, email, phone, property_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setFormData({
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        property_id: "", // Reset to empty string
      });
      fetchTenants();
    } catch (err) {
      console.error("Failed to submit tenant:", err);
    }
  };

  const handleEdit = (tenant) => {
    setEditing(true);
    setFormData(tenant);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/tenants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTenants();
    } catch (err) {
      console.error("Failed to delete tenant:", err);
    }
  };

  return (
    <div>
      <h1>Manage Tenants</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <select
          name="property_id"
          value={formData.property_id || ""}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {editing ? "Update Tenant" : "Add Tenant"}
        </button>
      </form>

      <h2>Tenants List</h2>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            {tenant.first_name} {tenant.last_name} - {tenant.email} -{" "}
            {tenant.phone}
            <button onClick={() => handleEdit(tenant)}>Edit</button>
            <button onClick={() => handleDelete(tenant.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TenantsManager;
