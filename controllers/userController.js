const userModel = require("../models/userModel");

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Convert ID to integer
  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userModel.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Convert ID to integer
  const userData = req.body;
  try {
    const updatedUser = await userModel.updateUser(userId, userData);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10); // Convert ID to integer
  try {
    await userModel.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
