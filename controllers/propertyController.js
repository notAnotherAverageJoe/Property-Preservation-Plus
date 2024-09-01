const db = require("../config/db");

// Helper function to get user's company ID
const getCompanyIdForUser = async (userId) => {
  const result = await db.query("SELECT company_id FROM users WHERE id = $1", [
    userId,
  ]);
  if (result.rows.length > 0) {
    return result.rows[0].company_id;
  } else {
    throw new Error("Company ID not found for user");
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  const userId = req.user.id; // Assumes user ID is added to req by authentication middleware
  const companyId = await getCompanyIdForUser(userId);

  const { name, address } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO properties (name, address, company_id) VALUES ($1, $2, $3) RETURNING *",
      [name, address, companyId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all properties for the authenticated user's company
exports.getProperties = async (req, res) => {
  const userId = req.user.id; // Assumes user ID is added to req by authentication middleware
  const companyId = await getCompanyIdForUser(userId);

  try {
    const result = await db.query(
      "SELECT * FROM properties WHERE company_id = $1",
      [companyId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a property
exports.updateProperty = async (req, res) => {
  const userId = req.user.id; // Assumes user ID is added to req by authentication middleware
  const companyId = await getCompanyIdForUser(userId);
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const result = await db.query(
      "UPDATE properties SET name = $1, address = $2 WHERE id = $3 AND company_id = $4 RETURNING *",
      [name, address, id, companyId]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res
        .status(404)
        .json({ error: "Property not found or does not belong to company" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  const userId = req.user.id; // Assumes user ID is added to req by authentication middleware
  const companyId = await getCompanyIdForUser(userId);
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM properties WHERE id = $1 AND company_id = $2 RETURNING *",
      [id, companyId]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Property deleted" });
    } else {
      res
        .status(404)
        .json({ error: "Property not found or does not belong to company" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
