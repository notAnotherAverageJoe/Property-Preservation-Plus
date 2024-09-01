const db = require("../config/db"); // Assuming you have a db.js for database queries

const propertyController = {
  createProperty: async (req, res) => {
    const { name, address } = req.body;

    try {
      // Use company_id from the authenticated user's session or token
      const company_id = req.user.company_id;

      const newProperty = await db.query(
        "INSERT INTO Properties (name, address, company_id) VALUES ($1, $2, $3) RETURNING *",
        [name, address, company_id]
      );

      res.json(newProperty.rows[0]);
    } catch (error) {
      console.error("Error creating property", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  },

  getProperties: async (req, res) => {
    try {
      const company_id = req.user.company_id;

      const properties = await db.query(
        "SELECT * FROM Properties WHERE company_id = $1",
        [company_id]
      );

      res.json(properties.rows);
    } catch (error) {
      console.error("Error fetching properties", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  },

  updateProperty: async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    try {
      const company_id = req.user.company_id;

      // Ensure the property belongs to the user's company
      const property = await db.query(
        "SELECT * FROM Properties WHERE id = $1 AND company_id = $2",
        [id, company_id]
      );

      if (property.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "Unauthorized to update this property" });
      }

      const updatedProperty = await db.query(
        "UPDATE Properties SET name = $1, address = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
        [name, address, id]
      );

      res.json(updatedProperty.rows[0]);
    } catch (error) {
      console.error("Error updating property", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  },

  deleteProperty: async (req, res) => {
    const { id } = req.params;

    try {
      const company_id = req.user.company_id;

      // Ensure the property belongs to the user's company
      const property = await db.query(
        "SELECT * FROM Properties WHERE id = $1 AND company_id = $2",
        [id, company_id]
      );

      if (property.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "Unauthorized to delete this property" });
      }

      await db.query("DELETE FROM Properties WHERE id = $1", [id]);

      res.json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  },
};

module.exports = propertyController;
