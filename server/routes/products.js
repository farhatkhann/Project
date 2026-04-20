const { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getProductByCategory } = require('../controllers/products');
const router = require('express').Router();

router.post('/post', createProduct);
router.get('/getAll', getAllProducts);
router.get('/getById/:id', getProductById);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get/:category',getProductByCategory);

module.exports = router;
