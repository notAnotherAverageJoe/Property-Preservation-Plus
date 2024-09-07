import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateRoleForm = () => {
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState([]); // State to store the roles
  const { user, token } = useAuth(); // Use user and token from Auth context

  const handleInputChange = (e) => {
    setRoleName(e.target.value);
  };

  // Define fetchRoles outside of useEffect to reuse it in handleSubmit
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(response.data);
    } catch (error) {
      setMessage("Error fetching roles.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName) {
      setMessage("Role name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/roles",
        {
          name: roleName,
          company_id: user.company_id, // Send company_id
          user_id: user.id, // Send user_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
      setMessage(response.data.message);
      setRoleName("");
      fetchRoles(); // Fetch roles again after a new role is created
    } catch (error) {
      setMessage("Error creating role.");
    }
  };

  // Fetch the roles on component mount
  useEffect(() => {
    if (token) {
      fetchRoles(); // Call fetchRoles if token exists
    }
  }, [token]);

  return (
    <div>
      <h2>Create a New Role</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roleName">Role Name:</label>
        <input
          type="text"
          id="roleName"
          value={roleName}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Role</button>
      </form>
      {message && <p>{message}</p>}

      {/* Display fetched roles */}
      <h3>Existing Roles</h3>
      <ul>
        {roles.length > 0 ? (
          roles.map((role) => (
            <li key={role.id}>
              {role.name} (ID: {role.id})
            </li>
          ))
        ) : (
          <p>No roles found.</p>
        )}
      </ul>
    </div>
  );
};

export default CreateRoleForm;
