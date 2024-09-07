import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateRoleForm = () => {
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const { user, token } = useAuth(); // Use user and token from Auth context

  const handleInputChange = (e) => {
    setRoleName(e.target.value);
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
    } catch (error) {
      setMessage("Error creating role.");
    }
  };

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
    </div>
  );
};

export default CreateRoleForm;
