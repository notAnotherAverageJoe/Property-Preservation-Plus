const roleModel = require("../models/roleModel");

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving roles", error: error.message });
  }
};

const getRoleById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const role = await roleModel.getRoleById(id);
    if (role) {
      res.json(role);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving role", error: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const role = await roleModel.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating role", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await roleModel.deleteRole(id);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRole,
};
