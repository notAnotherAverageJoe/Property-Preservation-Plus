const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const unitRoutes = require("./routes/unitRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// user routes
app.use("/api", userRoutes);
// Company routes
app.use("/api", companyRoutes);
// Proprty routes
app.use("/api", propertyRoutes);
// Unit routes
app.use("/api", unitRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
