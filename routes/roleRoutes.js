const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const pool = require("../config/db");
const authenticate = require("../middleware/authenticate");

// // Route to get all roles
// router.get("/roles", roleController.getAllRoles);

// Route to get a role by ID
router.get("/roles/:id", roleController.getRoleById);

router.get("/roles", authenticate, roleController.getRolesByUserId);

// Route to create a new role
router.post("/roles", authenticate, roleController.createRole);

// Route to delete a role
router.delete("/roles/:id", roleController.deleteRole);

module.exports = router;
