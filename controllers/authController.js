const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// Register User
const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, company_id } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { rows: existingUsers } = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    // If a user already exists, return a 400 response with an appropriate message
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    const { rows: newUsers } = await pool.query(
      "INSERT INTO Users (first_name, last_name, email, password_hash, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, email, hashedPassword, company_id || null]
      // If company_id is not provided, insert null by default
      // This was done so the new user can create the company themselves
    );

    const newUser = newUsers[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, company_id: newUser.company_id },
      process.env.JWT_SECRET,
      // Time is adjustable if client wishes
      { expiresIn: "1h" }
    );
    // Include user's ID in the token payload
    // Include user's email
    // Include company_id if provided OR Null for first time registering users
    // Users created by the creator will have company id's
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Login User (Not for creators)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists using emails which are unique in the DB
    const { rows: users } = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [email]
    );
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0]; // Retrieve the user data

    //Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Fetch user role and access level
    const { rows: roles } = await pool.query(
      "SELECT r.access_level FROM roles r JOIN userroles ur ON ur.role_id = r.id WHERE ur.user_id = $1",
      [user.id] // The user's ID is used to find their roles
    );

    const accessLevel = roles.length > 0 ? roles[0].access_level : null;

    if (!accessLevel) {
      // Default access level for users without roles
      accessLevel = 5;
    }

    // Create and return JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        company_id: user.company_id,
        access_level: accessLevel,
        is_owner: user.is_owner || false,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Login User
const creatorloginUser = async (req, res) => {
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

    // Check if the user has any roles
    const { rows: userRoles } = await pool.query(
      "SELECT * FROM userroles WHERE user_id = $1",
      [user.id]
    );

    if (userRoles.length > 0) {
      return res
        .status(403)
        .json({ message: "Access denied for users with roles" });
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
  creatorloginUser,
};
