const express = require('express');
const router = express.Router();
// const { createOrder } = require('../controllers/orderController');
const { createOrder } = require('../../controllers/order/orderController');


// Route để tạo order mới
router.post('/create', createOrder);

module.exports = router;
