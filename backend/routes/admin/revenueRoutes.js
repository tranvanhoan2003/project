
// backend/routes/revenueRoutes.js
const express = require('express');
const revenueController = require('../../controllers/admin/revenueController');

const router = express.Router();

// Route lấy doanh thu theo món ăn
router.get('/by-food', revenueController.getRevenueByFood);

// Route lấy doanh thu theo bàn
router.get('/by-table', revenueController.getRevenueByTable);

module.exports = router;

