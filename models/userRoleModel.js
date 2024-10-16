const pool = require("../config/db");

// Function to assign a role to a user
const assignRoleToUser = async (userId, roleId) => {
  try {
    const result = await pool.query(
      // RETURNING * in the INSERT query immediately returns
      //  the newly inserted row, which is a more efficient way to
      //   retrieve new data compared to running a second query.
      "INSERT INTO UserRoles (user_id, role_id) VALUES ($1, $2) RETURNING *",
      [userId, roleId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Error assigning role to user: " + error.message);
  }
};

// Function to remove a role from a user
const removeRoleFromUser = async (userId, roleId) => {
  try {
    await pool.query(
      "DELETE FROM UserRoles WHERE user_id = $1 AND role_id = $2",
      [userId, roleId]
    );
    return { message: "Role removed from user successfully" };
  } catch (error) {
    throw new Error("Error removing role from user: " + error.message);
  }
};

// Function to get roles for a user
// The JOIN in the getRolesByUserId query
//  illustrates an effective use of relationships
//   between tables, showing how multiple tables
//   can work together to provide complex information.
const getRolesByUserId = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT Roles.* FROM Roles JOIN UserRoles ON Roles.id = UserRoles.role_id WHERE UserRoles.user_id = $1",
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Error retrieving roles for user: " + error.message);
  }
};

module.exports = {
  assignRoleToUser,
  removeRoleFromUser,
  getRolesByUserId,
};
