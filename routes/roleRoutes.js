const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const pool = require("../config/db");

// Route to get all roles
router.get("/roles", roleController.getAllRoles);

// Route to get a role by ID
router.get("/roles/:id", roleController.getRoleById);

// Route to create a new role
router.post("/roles", roleController.createRole);

// Route to delete a role
router.delete("/roles/:id", roleController.deleteRole);

// Route to create a new role
router.post("/roles", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Role name is required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Roles (name) VALUES ($1) RETURNING *",
      [name]
    );
    res
      .status(201)
      .json({ message: `Role '${result.rows[0].name}' created successfully.` });
  } catch (error) {
    if (error.code === "23505") {
      // Unique constraint violation
      return res.status(400).json({ message: "Role already exists." });
    }
    res.status(500).json({ message: "Error creating role." });
  }
});

module.exports = router;
