const express = require('express');
const router = express.Router();
const orderSummaryController = require('../controllers/orderSummaryController');

// Lấy chi tiết đơn hàng
router.get('/orderDetails', orderSummaryController.getOrderDetails);

// Cập nhật trạng thái đơn hàng và bàn khi thanh toán
router.post('/updateStatus', orderSummaryController.updateOrderStatus);

module.exports = router;
