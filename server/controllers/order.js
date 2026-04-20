const connection = require("../dbConnection");
const confirmOrder = async (req, res) => {
    const { user_id, total_amount, scheduled_date, address, products } = req.body;
  
    // Generate 6-digit unique order ID
    async function generateUniqueOrderId() {
      let attempts = 0;
      const maxAttempts = 10000;
      while (attempts < maxAttempts) {
        attempts++;
        const orderId = Math.floor(100000 + Math.random() * 900000); // 6-digit
        const result = await connection.query('SELECT 1 FROM orders WHERE order_id = $1', [orderId]);
        if (result.rowCount === 0) {
          return orderId;
        }
      }
      throw new Error('Unable to generate a unique order ID');
    }
  
    try {
      const order_id = await generateUniqueOrderId();
  
      // Insert into orders table
      const orderQuery = `
        INSERT INTO orders (order_id, user_id, total_amount, scheduled_date, address)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await connection.query(orderQuery, [order_id, user_id, total_amount, scheduled_date, address]);
  
      // Insert into order_products table for each product
      for (const item of products) {
        const { product_id, quantity, price, plan } = item;
  
        const orderProductQuery = `
          INSERT INTO order_products (order_id, product_id, quantity, price, plan)
          VALUES ($1, $2, $3, $4, $5)
        `;
        await connection.query(orderProductQuery, [order_id, product_id, quantity, price, plan]);
      }
  
      res.status(200).json({ message: 'Order confirmed successfully', order_id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to confirm order' });
    }
  };

const getAllOrders = async (req, res) => {
  try {
    const ordersResult = await connection.query(`
      SELECT o.order_id, o.user_id, o.total_amount, o.order_date, o.scheduled_date, o.address,
             op.product_id, op.quantity, op.price, op.plan
      FROM orders o
      JOIN order_products op ON o.order_id = op.order_id
      ORDER BY o.order_date DESC
    `);

    // Group orders by order_id
    const ordersMap = new Map();
    for (const row of ordersResult.rows) {
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          order_id: row.order_id,
          user_id: row.user_id,
          total_amount: row.total_amount,
          order_date: row.order_date,
          scheduled_date: row.scheduled_date,
          address: row.address,
          products: []
        });
      }
      ordersMap.get(row.order_id).products.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
        plan: row.plan
      });
    }

    const orders = Array.from(ordersMap.values());
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

const deleteItemsAfterOrder = async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await connection.query(`
      DELETE FROM cart_products WHERE cart_id IN (
        SELECT cart_id FROM cart WHERE user_id = $1
      );
    `, [user_id]);

    await connection.query('UPDATE cart SET total_items = 0 WHERE user_id = $1', [user_id]);

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error clearing cart' });
  }
};

module.exports={confirmOrder, deleteItemsAfterOrder, getAllOrders};
  