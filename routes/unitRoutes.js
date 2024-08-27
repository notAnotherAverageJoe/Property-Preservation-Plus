const express = require("express");
const router = express.Router();
const unitController = require("../controllers/unitController");

// Route to get all units
router.get("/units", unitController.getAllUnits);

// Route to get a unit by ID
router.get("/units/:id", unitController.getUnitById);

// Route to create a new unit
router.post("/units", unitController.createUnit);

// Route to update a unit
router.put("/units/:id", unitController.updateUnit);

// Route to delete a unit
router.delete("/units/:id", unitController.deleteUnit);

module.exports = router;
