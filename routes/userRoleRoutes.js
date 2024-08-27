const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");

// Route to assign a role to a user
router.post("/user-roles", userRoleController.assignRoleToUser);

// Route to remove a role from a user
router.delete("/user-roles", userRoleController.removeRoleFromUser);

// Route to get roles for a user
router.get("/user-roles/:userId", userRoleController.getRolesByUserId);

module.exports = router;
