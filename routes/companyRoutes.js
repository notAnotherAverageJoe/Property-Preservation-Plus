const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

const db = require("../config/db"); // Import your database connection
const authenticate = require("../middleware/authenticate"); // Middleware to handle authentication

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

// companyRoutes.js

router.post("/api/companies", authenticate, async (req, res) => {
  const { name, address } = req.body;
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    const newCompany = await db.query(
      `INSERT INTO Companies (name, address) VALUES ($1, $2) RETURNING id`,
      [name, address]
    );

    const companyId = newCompany.rows[0].id;

    // Link company to the user
    await db.query(`UPDATE Users SET company_id = $1 WHERE id = $2`, [
      companyId,
      userId,
    ]);

    res.status(201).json({ companyId });
  } catch (error) {
    console.error("Failed to create company", error);
    res.status(500).json({ error: "Failed to create company" });
  }
});

module.exports = router;
