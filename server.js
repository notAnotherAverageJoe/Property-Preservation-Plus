const express = require("express");
const app = express();
require("dotenv").config();
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
const adminRoutes = require("./routes/adminRoutes");
const accessLevel = require("./middleware/accessLevel");
const axios = require("axios");
// Middleware to parse JSON
app.use(express.json());

// app.use(accessLevel);

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

app.use("/api/admin", adminRoutes);

// Function to convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

// Weather route

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY; // Ensure this is correctly loaded

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    // Convert the temperature from Celsius to Fahrenheit
    const weatherData = weatherResponse.data;
    weatherData.main.temp = celsiusToFahrenheit(weatherData.main.temp);

    res.json(weatherData);
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

// Starts the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
