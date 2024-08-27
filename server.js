const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// user routes
app.use("/api", userRoutes);
// Company routes
app.use("/api", companyRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
