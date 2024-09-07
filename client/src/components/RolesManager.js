import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CreateRoleForm from "./CreateRoleForm";

const RolesManager = () => {
  const { user, token, isAuthenticated, logout } = useAuth(); // Access user and token
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

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
          setLoading(false); // Data fetched successfully
        } catch (error) {
          setMessage("Error fetching roles.");
          setLoading(false); // Stop loading if error occurs
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
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default RolesManager;
