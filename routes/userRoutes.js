const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const companyController = require("../controllers/companyController");
// Route to get all users
router.get("/users", authenticate, userController.getAllUsers);

// Route to get a specific user by ID
router.get("/users/:id", authenticate, userController.getUserById);

// Route to create a new user
router.post("/users", authenticate, userController.createUser);

// Route to update a user
router.put("/users/:id", authenticate, userController.updateUser);

// Route to delete a user
router.delete("/users/:id", authenticate, userController.deleteUser);

// Route to update company and refresh token
router.post(
  "/updateCompany",
  authenticate,
  authenticate,
  companyController.updateCompany
);

module.exports = router;
