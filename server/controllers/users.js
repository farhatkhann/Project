const connection = require("../dbConnection");
//Get User By Id
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await connection.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json("User not found");
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Get user by ID error:", err);
      return res.status(500).json("Server error.");
    }
  };

module.exports = {getUserById};