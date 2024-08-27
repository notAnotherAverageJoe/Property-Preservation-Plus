const tenantModel = require("../models/tenantModel");

// Controller to get all tenants
const getAllTenants = async (req, res) => {
  try {
    const tenants = await tenantModel.getAllTenants();
    res.json(tenants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving tenants", error: error.message });
  }
};

// Controller to get a tenant by ID
const getTenantById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tenant = await tenantModel.getTenantById(id);
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving tenant", error: error.message });
  }
};

// Controller to create a new tenant
const createTenant = async (req, res) => {
  try {
    const tenant = await tenantModel.createTenant(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating tenant", error: error.message });
  }
};

// Controller to update a tenant
const updateTenant = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tenant = await tenantModel.updateTenant(id, req.body);
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating tenant", error: error.message });
  }
};

// Controller to delete a tenant
const deleteTenant = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await tenantModel.deleteTenant(id);
    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting tenant", error: error.message });
  }
};

module.exports = {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
};
