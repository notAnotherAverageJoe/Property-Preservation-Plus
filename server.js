const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const unitRoutes = require("./routes/unitRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const leaseRoutes = require("./routes/leaseRoutes");

// Middleware to parse JSON
app.use(express.json());

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
