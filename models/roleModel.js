const pool = require("../config/db");

// Function to get all roles
const getAllRoles = async () => {
  try {
    const result = await pool.query("SELECT * FROM Roles");
    return result.rows;
  } catch (error) {
    throw new Error("Error retrieving roles: " + error.message);
  }
};

// Function to get a role by ID
const getRoleById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM Roles WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error retrieving role: " + error.message);
  }
};

// Function to create a new role
const createRole = async (roleData) => {
  try {
    const { name } = roleData;
    const result = await pool.query(
      "INSERT INTO Roles (name) VALUES ($1) RETURNING *",
      [name]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Error creating role: " + error.message);
  }
};

// Function to delete a role
const deleteRole = async (id) => {
  try {
    await pool.query("DELETE FROM Roles WHERE id = $1", [id]);
    return { message: "Role deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting role: " + error.message);
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRole,
};
