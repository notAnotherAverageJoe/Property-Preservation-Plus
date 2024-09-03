const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");
const authenticate = require("../middleware/authenticate");

// Route to fetch units for a specific property
router.get(
  "/properties/:propertyId/units",
  authenticate,
  unitController.getUnitsByProperty
);

// Route to create a new unit
router.post("/units", authenticate, unitController.createUnit);

// Route to update a unit
router.put("/units/:id", authenticate, unitController.updateUnit);

// Route to delete a unit
router.delete("/units/:id", authenticate, unitController.deleteUnit);

module.exports = router;
