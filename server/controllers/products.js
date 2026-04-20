const connection = require("../dbConnection");
const createProduct = async (req, res) => {
    try {
      const { name, image, price_daily, price_weekly, price_monthly, quantity, description, category } = req.body;
      // Generate unique 4-digit user_id
      async function generateUniqueId() {
        let attempts = 0;
        const maxAttempts = 10000;
        while (attempts < maxAttempts) {
          attempts++;
          const productId = Math.floor(1000 + Math.random() * 900000);
          const result = await connection.query('SELECT 1 FROM products WHERE product_id = $1', [productId]);
          if (result.rowCount === 0) {
            return productId;
          }
        }
        throw new Error('Unable to generate a unique product ID');
      }
  
      const productId = await generateUniqueId();
      const insertQuery = `
        INSERT INTO products (product_id ,name, image, price_daily, price_weekly, price_monthly, quantity, description, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      const values = [productId ,name, image, price_daily, price_weekly, price_monthly, quantity, description, category];
  
      await connection.query(insertQuery, values);
      console.log("res post: ",res);
      return res.status(200).json("Product Added!");
  
    } catch (err) {
      console.error("Product post error:", err);
      return res.status(500).json("Server error.");
    }
  };

  const getAllProducts = async (req, res) => {
    try {
      const result = await connection.query("SELECT * FROM products");
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error("Get all products error:", err);
      return res.status(500).json("Server error.");
    }
  };
  
  // Read by ID
  const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await connection.query(
        "SELECT * FROM products WHERE product_id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json("Product not found");
      }
      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error("Get product by ID error:", err);
      return res.status(500).json("Server error.");
    }
  };
  
  // Update
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
      name,
      image,
      price_daily,
      price_weekly,
      price_monthly,
      quantity,
      description,
      category,
    } = req.body;
    try {
      const updateQuery = `
        UPDATE products
        SET name = $1, image = $2, price_daily = $3, price_weekly = $4, price_monthly = $5, quantity = $6, description = $7, category = $8
        WHERE product_id = $9
      `;
      const values = [
        name,
        image,
        price_daily,
        price_weekly,
        price_monthly,
        quantity,
        description,
        category,
        id,
      ];
  
      const result = await connection.query(updateQuery, values);
      if (result.rowCount === 0) {
        return res.status(404).json("Product not found for update");
      }
      console.log("res: ",res.body);
      return res.status(200).json("Product updated successfully");
    } catch (err) {
      console.error("Update product error:", err);
      return res.status(500).json("Server error.");
    }
  }; 
  
  // Delete
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await connection.query(
        "DELETE FROM products WHERE product_id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json("Product not found for deletion");
      }
      return res.status(200).json("Product deleted successfully");
    } catch (err) {
      console.error("Delete product error:", err);
      return res.status(500).json("Server error.");
    }
  };

  //Get Products By Category
  const getProductByCategory = async (req, res) => {
    try {
      // const { category } = req.params;
      const category = req.params.category.toLowerCase();
      const result = await connection.query(
        'SELECT * FROM products WHERE category = $1',
        [category]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory
  };