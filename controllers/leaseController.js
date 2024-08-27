const leaseModel = require("../models/leaseModel");

// Controller to get all leases
const getAllLeases = async (req, res) => {
  try {
    const leases = await leaseModel.getAllLeases();
    res.json(leases);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving leases", error: error.message });
  }
};

// Controller to get a lease by ID
const getLeaseById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const lease = await leaseModel.getLeaseById(id);
    if (lease) {
      res.json(lease);
    } else {
      res.status(404).json({ message: "Lease not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving lease", error: error.message });
  }
};

// Controller to create a new lease
const createLease = async (req, res) => {
  try {
    const lease = await leaseModel.createLease(req.body);
    res.status(201).json(lease);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating lease", error: error.message });
  }
};

// Controller to update a lease
const updateLease = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const lease = await leaseModel.updateLease(id, req.body);
    if (lease) {
      res.json(lease);
    } else {
      res.status(404).json({ message: "Lease not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating lease", error: error.message });
  }
};

// Controller to delete a lease
const deleteLease = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await leaseModel.deleteLease(id);
    res.json({ message: "Lease deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lease", error: error.message });
  }
};

module.exports = {
  getAllLeases,
  getLeaseById,
  createLease,
  updateLease,
  deleteLease,
};
