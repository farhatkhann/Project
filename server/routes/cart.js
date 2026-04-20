const { addToCart, getAllCartItems, deleteCartItem } = require("../controllers/cart");
const router = require('express').Router();

router.post('/add/:user_id',addToCart);
router.get('/items/:user_id', getAllCartItems);
router.delete('/delete/:user_id/:product_id', deleteCartItem);

module.exports = router;
