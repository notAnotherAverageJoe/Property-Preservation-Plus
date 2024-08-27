const express = require("express");
const router = express.Router();
const financialController = require("../controllers/financialController");

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

module.exports = router;
