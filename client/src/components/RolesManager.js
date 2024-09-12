import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CreateRoleForm from "./creationComponents/CreateRoleForm";
import RoleAssignment from "./creationComponents/RolesAssignment";
const RolesManager = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch roles
  const fetchRoles = async () => {
    if (isAuthenticated && token) {
      try {
        const response = await axios.get("http://localhost:3000/api/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error.response || error);
        setMessage("Error fetching roles.");
      }
    }
  };

  useEffect(() => {
    fetchRoles(); // Fetch roles on component mount
  }, [isAuthenticated, token]);

  return (
    <div>
      <h2>Manage Roles</h2>
      {user ? (
        <>
          <CreateRoleForm onRoleCreated={fetchRoles} /> {/* Pass callback */}
          <RoleAssignment roles={roles} onRoleAssigned={fetchRoles} />{" "}
          {/* Pass roles and callback */}
          <p>{message}</p>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default RolesManager;
