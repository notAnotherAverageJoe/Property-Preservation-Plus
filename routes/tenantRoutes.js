const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");
const db = require("../config/db");
const authenticate = require("../middleware/authenticate");

// Route to get all tenants
router.get("/tenants", authenticate, tenantController.getAllTenants);

// Route to create a new tenant
router.post("/tenants", authenticate, tenantController.createTenant);

// Route to update a tenant
router.put("/tenants/:id", authenticate, tenantController.updateTenant);

// Route to delete a tenant
router.delete("/tenants/:id", authenticate, tenantController.deleteTenant);

// Route to get tenants based on property_id query
router.get("/api/tenants", authenticate, async (req, res) => {
  const { property_id } = req.query;
  try {
    let tenants;
    if (property_id) {
      tenants = await db.query("SELECT * FROM tenants WHERE property_id = $1", [
        property_id,
      ]);
    } else {
      tenants = await db.query("SELECT * FROM tenants");
    }
    res.json(tenants.rows);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Route to create a new tenant with property validation
router.post("/api/tenants", authenticate, async (req, res) => {
  const { first_name, last_name, email, phone, property_id } = req.body;
  const { companyId } = req.user; // Assuming you attach company ID to req.user in middleware

  try {
    // Check if the property belongs to the company
    const property = await db.query(
      `SELECT * FROM properties WHERE id = $1 AND company_id = $2`,
      [property_id, companyId]
    );

    if (property.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: Property does not belong to this company" });
    }

    const result = await db.query(
      `INSERT INTO tenants (first_name, last_name, email, phone, property_id, company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [first_name, last_name, email, phone, property_id, companyId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create tenant" });
  }
});

// Route to get all tenants for a specific company
router.get(
  "/tenants/:company_id",
  authenticate,
  tenantController.getAllTenants
);

module.exports = router;
