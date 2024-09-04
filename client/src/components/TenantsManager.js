import React, { useState, useEffect } from "react";
import axios from "axios";

const TenantsManager = () => {
  const [tenants, setTenants] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch tenants from the server
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tenants");
      setTenants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // Update tenant
      try {
        await axios.put(
          `http://localhost:3000/api/tenants/${formData.id}`,
          formData
        );
        setEditing(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Create tenant
      try {
        await axios.post("http://localhost:3000/api/tenants", formData);
      } catch (err) {
        console.error(err);
      }
    }
    setFormData({
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    });
    fetchTenants();
  };

  const handleEdit = (tenant) => {
    setEditing(true);
    setFormData(tenant);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tenants/${id}`);
      fetchTenants();
    } catch (err) {
      console.error(err);
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
