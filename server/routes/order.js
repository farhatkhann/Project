const { confirmOrder, deleteItemsAfterOrder, getAllOrders } = require("../controllers/order");
const router = require('express').Router();

router.post('/confirm-order',confirmOrder);
router.get('/get/orders', getAllOrders);
router.delete('/clear-cart/:user_id', deleteItemsAfterOrder);

module.exports = router;
