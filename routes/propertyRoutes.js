const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authenticate = require("../middleware/authenticate"); // Middleware to handle authentication

// Route to create a new property
router.post("/properties", authenticate, propertyController.createProperty);

// Route to get all properties for the authenticated user's company
router.get("/properties", authenticate, propertyController.getProperties);

// Route to update a property
router.put("/properties/:id", authenticate, propertyController.updateProperty);

// Route to delete a property
router.delete(
  "/properties/:id",
  authenticate,
  propertyController.deleteProperty
);

module.exports = router;
