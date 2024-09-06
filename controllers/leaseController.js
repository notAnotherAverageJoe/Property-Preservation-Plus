const leaseModel = require("../models/leaseModel");
const pool = require("../config/db");

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
  try {
    const leaseId = req.params.id;
    const {
      unit_id,
      tenant_id,
      start_date,
      end_date,
      rent_amount,
      company_id,
    } = req.body;

    // Validation: Make sure all required fields are provided
    if (
      !unit_id ||
      !tenant_id ||
      !start_date ||
      !end_date ||
      !rent_amount ||
      !company_id
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Update the lease record in the database
    const query = `
      UPDATE leases 
      SET unit_id = $1, tenant_id = $2, start_date = $3, end_date = $4, rent_amount = $5, company_id = $6
      WHERE id = $7 RETURNING *
    `;
    const values = [
      unit_id,
      tenant_id,
      start_date,
      end_date,
      rent_amount,
      company_id,
      leaseId,
    ];

    const result = await pool.query(query, values);

    // Check if the lease was updated
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Lease not found." });
    }

    // Return the updated lease
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating lease:", error);
    res.status(500).json({ message: "Error updating lease" });
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
