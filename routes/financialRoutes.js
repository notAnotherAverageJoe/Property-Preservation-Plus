const express = require("express");
const router = express.Router();
const financialController = require("../controllers/financialController");
const authenticate = require("../middleware/authenticate");
const pool = require("../config/db");

// Route to get all financial transactions
router.get(
  "/financial-transactions",
  authenticate,
  financialController.getAllFinancialTransactions
);

// Route to get a financial transaction by ID
router.get(
  "/financial-transactions/:id",
  authenticate,
  financialController.getFinancialTransactionById
);

// Route to create a new financial transaction
router.post(
  "/financial-transactions",
  authenticate,
  financialController.createFinancialTransaction
);

// Route to update a financial transaction
router.put(
  "/financial-transactions/:id",
  authenticate,
  financialController.updateFinancialTransaction
);

// Route to delete a financial transaction
router.delete(
  "/financial-transactions/:id",
  authenticate,
  financialController.deleteFinancialTransaction
);

// Route to get financial transactions for a specific property
router.get(
  "/properties/:propertyId/financial-transactions",
  authenticate,
  async (req, res) => {
    const propertyId = parseInt(req.params.propertyId);
    try {
      const result = await pool.query(
        "SELECT * FROM FinancialTransactions WHERE property_id = $1",
        [propertyId]
      );
      if (result.rows.length > 0) {
        res.json(result.rows);
      } else {
        res.status(404).json({
          message: "No financial transactions found for this property",
        });
      }
    } catch (error) {
      console.error("Error fetching financial transactions:", error);
      res.status(500).json({
        message: "Error fetching financial transactions",
        error: error.message,
      });
    }
  }
);

module.exports = router;
