const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes
app.use("/api", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
