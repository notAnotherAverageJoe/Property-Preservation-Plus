import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import CreateRoleForm from "./creationComponents/CreateRoleForm";
import RoleAssignment from "./creationComponents/RolesAssignment";
import "./styles/RoleManager.css";

const RolesManager = () => {
  // Destructure user, token, and authentication status from the useAuth context
  const { user, token, isAuthenticated } = useAuth();

  // State to hold the list of roles and a message for error or success feedback
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  // Function to fetch roles from the server
  const fetchRoles = async () => {
    // Only fetch roles if the user is authenticated and a token is available
    if (isAuthenticated && token) {
      try {
        // Make a GET request to fetch roles, passing the authorization token in the headers
        const response = await axios.get("http://localhost:3000/api/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the roles state with the fetched data
        setRoles(response.data);
      } catch (error) {
        // Log any errors to the console and set a message for user feedback
        console.error("Error fetching roles:", error.response || error);
        setMessage("Error fetching roles.");
      }
    }
  };

  // useEffect hook to fetch roles when the component mounts or when authentication state changes
  useEffect(() => {
    fetchRoles(); // Fetch roles on component mount
  }, [isAuthenticated, token]);

  // Render the component
  return (
    <div>
      <h2 className="roles-manager-title">Manage Roles</h2>
      {user ? ( // Check if a user is logged in
        <div className="roles-manager-container">
          {/* Component to create new roles */}
          <div className="roles-manager-component">
            <CreateRoleForm onRoleCreated={fetchRoles} />
          </div>
          {/* Component to assign existing roles to users */}
          <div className="roles-manager-component">
            <RoleAssignment roles={roles} onRoleAssigned={fetchRoles} />
          </div>
        </div>
      ) : (
        // Message prompting user to log in if not authenticated
        <p>Please log in.</p>
      )}
      {message && <p>{message}</p>} {/* Display any error or success message */}
    </div>
  );
};

// Export the RolesManager component for use in other parts of the application
export default RolesManager;
