const express = require("express");
const router = express.Router();
const {
  getAdminDashboard,
  getRestrictedData,
} = require("../controllers/adminController");
const restrictToAccessLevel = require("../middleware/accessLevel");

// Routes with access level restrictions
router.get("/admin-dashboard", restrictToAccessLevel(5), getAdminDashboard);
router.get("/restricted-data", restrictToAccessLevel(3), getRestrictedData);

module.exports = router;
