const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const companyController = require("../controllers/companyController");

// Route to get all users
router.get("/users", userController.getAllUsers);

// Route to get a specific user by ID
router.get("/users/:id", userController.getUserById);

// Route to create a new user
router.post("/users", userController.createUser);

// Route to update a user
router.put("/users/:id", userController.updateUser);

// Route to delete a user
router.delete("/users/:id", userController.deleteUser);

// Route to update company and refresh token
router.post("/updateCompany", authenticate, companyController.updateCompany);

module.exports = router;
