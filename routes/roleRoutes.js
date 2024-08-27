const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// Route to get all roles
router.get("/roles", roleController.getAllRoles);

// Route to get a role by ID
router.get("/roles/:id", roleController.getRoleById);

// Route to create a new role
router.post("/roles", roleController.createRole);

// Route to delete a role
router.delete("/roles/:id", roleController.deleteRole);

module.exports = router;
