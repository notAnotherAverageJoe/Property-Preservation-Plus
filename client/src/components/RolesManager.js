import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CreateRoleForm from "./CreateRoleForm";

const RolesManager = () => {
  const { user, token, isAuthenticated, logout } = useAuth(); // Access user and token
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchRoles = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/roles", {
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in Authorization header
            },
          });
          setRoles(response.data);
        } catch (error) {
          setMessage("Error fetching roles.");
        }
      };

      fetchRoles();
    }
  }, [isAuthenticated, token]);

  const handleDelete = async (roleId) => {
    try {
      await axios.delete(`http://localhost:3000/api/roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      setRoles(roles.filter((role) => role.id !== roleId));
      setMessage("Role deleted successfully.");
    } catch (error) {
      setMessage("Error deleting role.");
    }
  };

  return (
    <div>
      <h2>Manage Roles</h2>
      {user ? (
        <CreateRoleForm companyId={user.company_id} />
      ) : (
        <p>Please log in.</p>
      )}
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
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default RolesManager;
