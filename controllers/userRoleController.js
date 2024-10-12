const userRoleModel = require("../models/userRoleModel");

// Controller function to assign a role to a user
const assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.body; // Destructure userId and roleId from the request body
  try {
    // Call the model function to assign the role and await the result
    const userRole = await userRoleModel.assignRoleToUser(userId, roleId);
    res.status(201).json(userRole); // Respond with a 201 status and the assigned user role
  } catch (error) {
    // Handle errors that may occur during the process
    res
      .status(500)
      .json({ message: "Error assigning role to user", error: error.message }); // Send an error message
  }
};

// Controller function to remove a role from a user
const removeRoleFromUser = async (req, res) => {
  const { userId, roleId } = req.body; // Destructure userId and roleId from the request body
  try {
    // Call the model function to remove the role and await completion
    await userRoleModel.removeRoleFromUser(userId, roleId);
    res.json({ message: "Role removed from user successfully" }); // Respond with a success message
  } catch (error) {
    // Handle any errors that may occur during the process
    res
      .status(500) // Respond with a 500 status for server errors
      .json({ message: "Error removing role from user", error: error.message }); // Send an error message
  }
};

// Controller function to retrieve roles assigned to a user by user ID
const getRolesByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId); // Parse userId from the request parameters
  try {
    // Call the model function to get roles and await the result
    const roles = await userRoleModel.getRolesByUserId(userId);
    res.json(roles); // Respond with the retrieved roles
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving roles for user",
      error: error.message,
    });
  }
};

module.exports = {
  assignRoleToUser,
  removeRoleFromUser,
  getRolesByUserId,
};
