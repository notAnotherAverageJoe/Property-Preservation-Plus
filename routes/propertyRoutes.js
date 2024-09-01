const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const authenticate = require("../middleware/authenticate");
const pool = require("../config/db");

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

// Route to get a specific property
router.get("/properties/:id", authenticate, async (req, res) => {
  const propertyId = parseInt(req.params.id);
  try {
    const result = await pool.query("SELECT * FROM Properties WHERE id = $1", [
      propertyId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json({
      message: "Error fetching property details",
      error: error.message,
    });
  }
});

router.get(
  "/api/properties/:id/financial-transactions",
  propertyController.getFinancialTransactions
);
module.exports = router;
