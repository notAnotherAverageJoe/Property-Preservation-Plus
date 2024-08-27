const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// Route to get all properties
router.get("/properties", propertyController.getAllProperties);

// Route to get a property by ID
router.get("/properties/:id", propertyController.getPropertyById);

// Route to create a new property
router.post("/properties", propertyController.createProperty);

// Route to update a property
router.put("/properties/:id", propertyController.updateProperty);

// Route to delete a property
router.delete("/properties/:id", propertyController.deleteProperty);

module.exports = router;
