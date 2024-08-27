const unitModel = require("../models/unitModel");

// Controller to get all units
const getAllUnits = async (req, res) => {
  try {
    const units = await unitModel.getAllUnits();
    res.json(units);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving units", error: error.message });
  }
};

// Controller to get a unit by ID
const getUnitById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const unit = await unitModel.getUnitById(id);
    if (unit) {
      res.json(unit);
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving unit", error: error.message });
  }
};

// Controller to create a new unit
const createUnit = async (req, res) => {
  try {
    const unit = await unitModel.createUnit(req.body);
    res.status(201).json(unit);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating unit", error: error.message });
  }
};

// Controller to update a unit
const updateUnit = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const unit = await unitModel.updateUnit(id, req.body);
    if (unit) {
      res.json(unit);
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating unit", error: error.message });
  }
};

// Controller to delete a unit
const deleteUnit = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await unitModel.deleteUnit(id);
    res.json({ message: "Unit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting unit", error: error.message });
  }
};

module.exports = {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
};
