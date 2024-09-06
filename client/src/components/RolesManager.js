import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateRoleForm from "./CreateRoleForm"; // Import the form

const RolesManager = () => {
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/roles");
        setRoles(response.data);
      } catch (error) {
        setMessage("Error fetching roles.");
      }
    };

    fetchRoles();
  }, []);

  // Handle delete role
  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`http://localhost:3000/api/roles/${roleId}`);
      setRoles(roles.filter((role) => role.id !== roleId));
      setMessage("Role deleted successfully.");
    } catch (error) {
      setMessage("Error deleting role.");
    }
  };

  return (
    <div>
      <h2>Manage Roles</h2>
      <CreateRoleForm />

      {message && <p>{message}</p>}

      <h3>Existing Roles</h3>
      {roles.length > 0 ? (
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              {role.name}
              <button onClick={() => handleDelete(role.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No roles found.</p>
      )}
    </div>
  );
};

export default RolesManager;
