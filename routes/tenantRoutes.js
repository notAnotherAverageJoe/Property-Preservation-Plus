const express = require("express");
const router = express.Router();
const tenantController = require("../controllers/tenantController");

// Route to get all tenants
router.get("/tenants", tenantController.getAllTenants);

// Route to get a tenant by ID
router.get("/tenants/:id", tenantController.getTenantById);

// Route to create a new tenant
router.post("/tenants", tenantController.createTenant);

// Route to update a tenant
router.put("/tenants/:id", tenantController.updateTenant);

// Route to delete a tenant
router.delete("/tenants/:id", tenantController.deleteTenant);

// routes/tenants.js
router.get("/api/tenants", async (req, res) => {
  try {
    const tenants = await pool.query("SELECT * FROM Tenants");
    res.json(tenants.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/api/tenants", async (req, res) => {
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

module.exports = router;
