const pool = require("../config/db");

// Function to get all users
const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    return result.rows;
  } catch (error) {
    throw new Error("Error retrieving users: " + error.message);
  }
};

// Function to get user by ID
const getUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM Users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error retrieving user: " + error.message);
  }
};

// Function to create a new user
const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, passwordHash } = userData;
    const result = await pool.query(
      "INSERT INTO Users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, passwordHash]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

// Function to update a user
const updateUser = async (id, userData) => {
  try {
    const { firstName, lastName, email, passwordHash } = userData;
    const result = await pool.query(
      "UPDATE Users SET first_name = $1, last_name = $2, email = $3, password_hash = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
      [firstName, lastName, email, passwordHash, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

// Function to delete a user
const deleteUser = async (id) => {
  try {
    await pool.query("DELETE FROM Users WHERE id = $1", [id]);
    return { message: "User deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

// Export functions
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
