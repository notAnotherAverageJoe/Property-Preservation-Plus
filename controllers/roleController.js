const pool = require("../config/db");

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving roles." });
  }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Role not found." });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving role." });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  const { name } = req.body;
  const company_id = req.user.company_id; // Get company_id from authenticated user
  const user_id = req.user.id; // Get user_id from authenticated user

  if (!name) {
    return res.status(400).json({ error: "Role name is required." });
  }

  try {
    const newRole = await pool.query(
      "INSERT INTO roles (name, company_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, company_id, user_id]
    );
    res
      .status(201)
      .json({ message: "Role created successfully", role: newRole.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error creating role." });
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM roles WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Role not found." });
    }
    res.json({ message: "Role deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting role." });
  }
};

// Fetch roles by user ID
exports.getRolesByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user information from authentication middleware
    const roles = await pool.query("SELECT * FROM roles WHERE user_id = $1", [
      userId,
    ]);
    res.json(roles.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
