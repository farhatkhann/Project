const router = require('express').Router();
const {getUserById} = require('../controllers/users');
router.get('/getById/:id', getUserById);
module.exports = router;