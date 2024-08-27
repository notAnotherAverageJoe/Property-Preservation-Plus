const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// user routes
app.use("/api", userRoutes);
// Company routes
app.use("/api", companyRoutes);
// Proprty routes
app.use("/api", propertyRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
