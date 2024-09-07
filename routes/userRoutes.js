const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const companyController = require("../controllers/companyController");

// Route to get a specific user by ID
router.get("/users/:id", authenticate, userController.getUserById);

// Route to create a new user
router.post("/users", authenticate, userController.createUser);

// Route to update a user
router.put("/users/:id", authenticate, userController.updateUser);

// Route to delete a user
router.delete("/users/:id", authenticate, userController.deleteUser);

// Route to login a user
router.post("/login", userController.loginUser);

// Route to update user password
router.put("/users/:id/password", authenticate, userController.updatePassword);

// Route to update company information and refresh token
router.post("/updateCompany", authenticate, companyController.updateCompany);

router.get("/users", authenticate, userController.getUsersByCompanyId);

module.exports = router;
