const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");
const pool = require("../config/db");

// Route to get all leases
router.get("/leases", leaseController.getAllLeases);

// Route to get a lease by ID
router.get("/leases/:id", leaseController.getLeaseById);

// Route to create a new lease
router.post("/leases", leaseController.createLease);

// Route to update a lease
router.put("/leases/:id", leaseController.updateLease);

// Route to delete a lease
router.delete("/leases/:id", leaseController.deleteLease);

// Create a new lease

router.post("/api/leases", async (req, res) => {
  const { unit_id, tenant_id, start_date, end_date, rent_amount } = req.body;

  // Log the incoming data
  console.log("Received data:", req.body);

  try {
    // Insert the new lease
    const newLease = await pool.query(
      `INSERT INTO Leases (unit_id, tenant_id, start_date, end_date, rent_amount)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [unit_id, tenant_id, start_date, end_date, rent_amount]
    );

    // Respond with the newly created lease
    res.json(newLease.rows[0]);
  } catch (err) {
    // Log the error with more detail
    console.error("Error while inserting lease:", err);

    // Respond with a 500 status and an error message
    res.status(500).send("Server Error");
  }
});

module.exports = router;
