import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CreateRoleForm from "./creationComponents/CreateRoleForm";

const RolesManager = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch users
  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users:", error.response || error);
          setMessage("Error fetching users.");
        }
      };
      fetchUsers();
    }
  }, [isAuthenticated, token]);

  // Fetch roles
  useEffect(() => {
    if (isAuthenticated && token) {
      const fetchRoles = async () => {
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
      };
      fetchRoles();
    }
  }, [isAuthenticated, token]);

  // Handle role assignment
  const handleAssignRole = async () => {
    if (!selectedUserId || !selectedRoleId) {
      setMessage("Please select both user and role.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user-roles",
        { userId: selectedUserId, roleId: selectedRoleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Role assigned successfully.");
    } catch (error) {
      console.error("Error assigning role:", error.response || error);
      setMessage("Error assigning role.");
    }
  };

  return (
    <div>
      <h2>Manage Roles</h2>
      {user ? (
        <>
          <CreateRoleForm companyId={user.company_id} />
          <div>
            <h3>Assign Role to User</h3>
            <div>
              <label>User: </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name} {u.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Role: </label>
              <select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleAssignRole}>Assign Role</button>
          </div>
          <p>{message}</p>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default RolesManager;
