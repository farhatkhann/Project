const connection = require("../dbConnection");
// const addToCart = async (req, res) => {
//     const { user_id } = req.params;
//     const { product_id, quantity} = req.body;
//     async function generateUniqueId() {
//         let attempts = 0;
//         const maxAttempts = 10000;
//         while (attempts < maxAttempts) {
//             attempts++;
//             const productId = Math.floor(1000 + Math.random() * 900000);
//             const result = await connection.query('SELECT 1 FROM products WHERE product_id = $1', [productId]);
//             if (result.rowCount === 0) {
//                 return productId;
//             }
//         }
//         throw new Error('Unable to generate a unique product ID');
//     }

//     const cartId = await generateUniqueId();
//     try {
//         let result = await connection.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
//         let cart_id;
    
//         if (result.rows.length === 0) {
//             // Create a new cart for the user if it doesn't exist
//             const insertQuery = `
//                 INSERT INTO cart (cart_id, user_id, total_items) 
//                 VALUES ($1, $2, 0) 
//                 RETURNING cart_id
//             `;
//             const values = [cartId, user_id];
//             const newCart = await connection.query(insertQuery, values);
//             cart_id = newCart.rows[0].cart_id;
//         } else {
//             cart_id = result.rows[0].cart_id;
//         }

//         // Check if product is already in the cart
//         let cartProduct = await connection.query('SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);

//         if (cartProduct.rows.length > 0) {
//             // If product exists, update the quantity
//             await connection.query('UPDATE cart_products SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3', [quantity, cart_id, product_id]);
//         } else {
//             // Add product to cart
//             await connection.query('INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cart_id, product_id, quantity]);
//         }

//         // Update the total_items in the cart
//         await connection.query(
//             'UPDATE cart SET total_items = (SELECT SUM(quantity) FROM cart_products WHERE cart_id = $1) WHERE cart_id = $1',
//             [cart_id]
//         );

//         res.status(200).json({ message: 'Product added to cart successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error adding product to cart' });
//     }
// };
const addToCart = async (req, res) => {
    const { user_id } = req.params;
    const { product_id, quantity, price, plan } = req.body;
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

    const cartId = await generateUniqueId();
    try {
        let result = await connection.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
        let cart_id;
    
        if (result.rows.length === 0) {
            // Create a new cart for the user if it doesn't exist
            const insertQuery = `
                INSERT INTO cart (cart_id, user_id, total_items) 
                VALUES ($1, $2, 0) 
                RETURNING cart_id
            `;
            const values = [cartId, user_id];
            const newCart = await connection.query(insertQuery, values);
            cart_id = newCart.rows[0].cart_id;
        } else {
            cart_id = result.rows[0].cart_id;
        }

        // Check if product is already in the cart
        let cartProduct = await connection.query('SELECT * FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);

        if (cartProduct.rows.length > 0) {
            // If product exists, update the quantity
            await connection.query('UPDATE cart_products SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3', [quantity, cart_id, product_id]);
        } else {
            // Add product to cart
            await connection.query('INSERT INTO cart_products (cart_id, product_id, quantity, price, plan) VALUES ($1, $2, $3, $4, $5)', [cart_id, product_id, quantity, price, plan]);
        }

        // Update the total_items in the cart
        await connection.query(
            'UPDATE cart SET total_items = (SELECT SUM(quantity) FROM cart_products WHERE cart_id = $1) WHERE cart_id = $1',
            [cart_id]
        );

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
};

// Get all products in the user's cart
const getAllCartItems = async (req, res) => {
    const { user_id } = req.params;``
    try {
        // Fetch cart information for the user
        const cartResult = await connection.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);

        if (cartResult.rows.length === 0) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }
        const cart_id = cartResult.rows[0].cart_id;

        // Fetch all products in the cart
        const cartProductsResult = await connection.query(
            'SELECT p.image,p.product_id,p.name,cp.quantity,cp.price,cp.plan FROM cart_products cp JOIN products p ON cp.product_id = p.product_id WHERE cp.cart_id = $1',
            [cart_id]
        );
        res.status(200).json(cartProductsResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching cart items' });
    }
};

// Delete a product from the cart
const deleteCartItem = async (req, res) => {
    const { user_id, product_id } = req.params;

    try {
        // Check if cart exists for the user
        const cartResult = await connection.query('SELECT * FROM cart WHERE user_id = $1', [user_id]);
        
        if (cartResult.rows.length === 0) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }

        const cart_id = cartResult.rows[0].cart_id;

        // Remove product from cart
        await connection.query('DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]);

        // Update the total_items in the cart
        await connection.query(
            'UPDATE cart SET total_items = (SELECT SUM(quantity) FROM cart_products WHERE cart_id = $1) WHERE cart_id = $1',
            [cart_id]
        );

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing product from cart' });
    }
};



module.exports = { addToCart, getAllCartItems, deleteCartItem };