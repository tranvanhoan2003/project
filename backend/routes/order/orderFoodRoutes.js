const express = require('express');
const router = express.Router();
// const orderFoodController = require('../controllers/orderFoodController');
const orderFoodController = require('../../controllers/order/orderFoodController');

// Định tuyến để tạo một mục trong bảng order_food
router.post('/create', orderFoodController.createOrderFood);

// Định tuyến để lấy mã đơn hàng dựa trên tên bàn
router.get('/code', orderFoodController.getOrderCodeByTableName);

module.exports = router;
