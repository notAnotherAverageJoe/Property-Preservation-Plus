const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");

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

module.exports = router;
