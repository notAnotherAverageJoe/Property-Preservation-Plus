const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// Route to create a new company
router.post("/companies", companyController.createCompany);

// Route to update an existing company
router.put("/companies/:id", companyController.updateCompany);

// Route to get all companies
router.get("/companies", companyController.getAllCompanies);

// Route to get a specific company by ID
router.get("/companies/:id", companyController.getCompanyById);

// Route to delete a company
router.delete("/companies/:id", companyController.deleteCompany);

module.exports = router;
