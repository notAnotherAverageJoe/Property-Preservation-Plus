const maintenanceModel = require("../models/maintenanceModel");

// Controller to get all maintenance requests
const getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await maintenanceModel.getAllMaintenanceRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving maintenance requests",
      error: error.message,
    });
  }
};

// Controller to get a maintenance request by ID
const getMaintenanceRequestById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const request = await maintenanceModel.getMaintenanceRequestById(id);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: "Maintenance request not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving maintenance request",
      error: error.message,
    });
  }
};

// Controller to create a new maintenance request
const createMaintenanceRequest = async (req, res) => {
  try {
    const request = await maintenanceModel.createMaintenanceRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: "Error creating maintenance request",
      error: error.message,
    });
  }
};

// Controller to update a maintenance request
const updateMaintenanceRequest = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const request = await maintenanceModel.updateMaintenanceRequest(
      id,
      req.body
    );
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: "Maintenance request not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating maintenance request",
      error: error.message,
    });
  }
};

// Controller to delete a maintenance request
const deleteMaintenanceRequest = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await maintenanceModel.deleteMaintenanceRequest(id);
    res.json({ message: "Maintenance request deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting maintenance request",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMaintenanceRequests,
  getMaintenanceRequestById,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
};
