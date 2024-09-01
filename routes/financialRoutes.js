const express = require("express");
const router = express.Router();
const financialController = require("../controllers/financialController");
const authenticate = require("../middleware/authenticate");
const pool = require("../config/db");

// Route to get all financial transactions
router.get(
  "/financial-transactions",
  financialController.getAllFinancialTransactions
);

// Route to get a financial transaction by ID
router.get(
  "/financial-transactions/:id",
  financialController.getFinancialTransactionById
);

// Route to create a new financial transaction
router.post(
  "/financial-transactions",
  financialController.createFinancialTransaction
);

// Route to update a financial transaction
router.put(
  "/financial-transactions/:id",
  financialController.updateFinancialTransaction
);

// Route to delete a financial transaction
router.delete(
  "/financial-transactions/:id",
  financialController.deleteFinancialTransaction
);
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
    console.error("Error fetching property details:", error); // Log the error
    res.status(500).json({
      message: "Error fetching property details",
      error: error.message,
    });
  }
});

module.exports = router;
