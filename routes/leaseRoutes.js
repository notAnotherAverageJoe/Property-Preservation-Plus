const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");
const pool = require("../config/db");

// Fetch leases with optional filtering by tenant_id or company_id
router.get("/leases", async (req, res) => {
  try {
    const { tenant_id, company_id } = req.query;

    let query = "SELECT * FROM leases WHERE 1=1"; // 1=1 is a no-op, makes adding conditions easier
    const queryParams = [];

    if (tenant_id) {
      query += " AND tenant_id = $1";
      queryParams.push(tenant_id);
    }

    if (company_id) {
      query += tenant_id ? " AND company_id = $2" : " AND company_id = $1";
      queryParams.push(company_id);
    }

    const { rows: leases } = await pool.query(query, queryParams);
    res.json(leases);
  } catch (error) {
    console.error("Error fetching leases:", error);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

// Get a lease by ID
router.get("/leases/:id", leaseController.getLeaseById);

// Create a new lease
router.post("/leases", async (req, res) => {
  try {
    const {
      unit_id,
      tenant_id,
      start_date,
      end_date,
      rent_amount,
      company_id,
    } = req.body;

    // Validation
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

    const query = `
      INSERT INTO leases (unit_id, tenant_id, start_date, end_date, rent_amount, company_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [
      unit_id,
      tenant_id,
      start_date,
      end_date,
      rent_amount,
      company_id,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating lease:", error);
    res.status(500).json({ message: "Error creating lease" });
  }
});

// Update a lease by ID
router.put("/leases/:id", leaseController.updateLease);

// Delete a lease by ID
router.delete("/leases/:id", leaseController.deleteLease);

module.exports = router;
