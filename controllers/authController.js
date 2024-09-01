const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Ensure this is your database connection

// Register User
const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, company_id } = req.body;

  try {
    // Check if the user already exists
    const { rows: existingUsers } = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const { rows: newUsers } = await pool.query(
      "INSERT INTO Users (first_name, last_name, email, password_hash, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, hashedPassword, company_id]
    );

    const newUser = newUsers[0];

    // Create and return JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, company_id: newUser.company_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const { rows: users } = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and return JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, company_id: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
