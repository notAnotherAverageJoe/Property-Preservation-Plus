const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

// Route to get all maintenance requests
router.get(
  "/maintenance-requests",
  maintenanceController.getAllMaintenanceRequests
);

// Route to get a maintenance request by ID
router.get(
  "/maintenance-requests/:id",
  maintenanceController.getMaintenanceRequestById
);

// Route to create a new maintenance request
router.post(
  "/maintenance-requests",
  maintenanceController.createMaintenanceRequest
);

// Route to update a maintenance request
router.put(
  "/maintenance-requests/:id",
  maintenanceController.updateMaintenanceRequest
);

// Route to delete a maintenance request
router.delete(
  "/maintenance-requests/:id",
  maintenanceController.deleteMaintenanceRequest
);

module.exports = router;
