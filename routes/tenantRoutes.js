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

module.exports = router;
