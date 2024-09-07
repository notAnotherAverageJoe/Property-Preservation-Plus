import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateUserForm = () => {
  const { token, user } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userRoles, setUserRoles] = useState([]); // Initialize as empty array

  // Fetch user roles from an API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRoles(response.data.roles || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching roles:", error);
        setUserRoles([]); // Fallback to empty array if error occurs
      }
    };

    fetchRoles();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/users",
        {
          email,
          role,
          company_id: user.company_id,
          first_name: firstName,
          last_name: lastName,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("User created successfully.");
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      setMessage("Error creating user.");
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {userRoles.length > 0 ? (
            userRoles.map((userRole, index) => (
              <option key={index} value={userRole}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </option>
            ))
          ) : (
            <option value="user">User</option>
          )}
        </select>

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUserForm;
