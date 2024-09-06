const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");
const pool = require("../config/db");

// Route to fetch leases
router.get("/leases", async (req, res) => {
  try {
    const tenantId = req.query.tenant_id;
    let query = "SELECT * FROM leases";
    const queryParams = [];

    if (tenantId) {
      query += " WHERE tenant_id = $1";
      queryParams.push(tenantId);
    }

    const { rows: leases } = await pool.query(query, queryParams);
    res.json(leases);
  } catch (error) {
    console.error("Error fetching leases:", error);
    res.status(500).json({ message: "Error fetching leases" });
  }
});

// Route to get a lease by ID
router.get("/leases/:id", leaseController.getLeaseById);

// Route to create a new lease
router.post("/leases", leaseController.createLease);

// Route to update a lease
router.put("/leases/:id", leaseController.updateLease);

// Route to delete a lease
router.delete("/leases/:id", leaseController.deleteLease);

// Route to get leases by company ID (currently empty)
router.get("/api/leases/company/:companyId");

module.exports = router;
