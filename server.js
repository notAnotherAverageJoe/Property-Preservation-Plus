const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const unitRoutes = require("./routes/unitRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const leaseRoutes = require("./routes/leaseRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const financialRoutes = require("./routes/financialRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// user routes
app.use("/api", userRoutes);
// Company routes
app.use("/api", companyRoutes);
// Property routes
app.use("/api", propertyRoutes);
// Unit routes
app.use("/api", unitRoutes);
// Tenant routes
app.use("/api", tenantRoutes);
// Lease routes
app.use("/api", leaseRoutes);
// Maintenance request routes
app.use("/api", maintenanceRoutes);
// Financial transaction routes
app.use("/api", financialRoutes);
// Role routes
app.use("/api", roleRoutes);
// User role routes
app.use("/api", userRoleRoutes);
// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/units", maintenanceRoutes);
app.use("api/tenants", tenantRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
