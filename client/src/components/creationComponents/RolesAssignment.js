import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "../pagesCSS/RoleAssignment.css";

const RoleAssignment = ({ roles, onRoleAssigned }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
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
  }, [token]);

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
      onRoleAssigned(); // Call callback to refresh role assignments
    } catch (error) {
      console.error("Error assigning role:", error.response || error);
      setMessage("Error assigning role.");
    }
  };

  return (
    <div className="role-assignment-container">
      <h3>Assign Role to User</h3>
      <h2>Or Reassign Role to User</h2>
      <div>
        <label htmlFor="user-select">User: </label>
        <select
          id="user-select"
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
        <label htmlFor="role-select">Role: </label>
        <select
          id="role-select"
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
      <p>{message}</p>
    </div>
  );
};

export default RoleAssignment;
