const propertyModel = require("../models/propertyModel");

// Function to handle getting all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving properties",
      error: error.message,
    });
  }
};

// Function to handle getting a property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await propertyModel.getPropertyById(id);
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving property",
      error: error.message,
    });
  }
};

// Function to handle creating a new property
const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    const newProperty = await propertyModel.createProperty(propertyData);
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({
      message: "Error creating property",
      error: error.message,
    });
  }
};

// Function to handle updating a property
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyData = req.body;
    const updatedProperty = await propertyModel.updateProperty(
      id,
      propertyData
    );
    if (updatedProperty) {
      res.status(200).json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating property",
      error: error.message,
    });
  }
};

// Function to handle deleting a property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    await propertyModel.deleteProperty(id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting property",
      error: error.message,
    });
  }
};

// Export functions
module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
