// backend/routes/billRoutes.js
const express = require('express');
const billController = require('../../controllers/admin/billController');
const router = express.Router();

// Định nghĩa route API để lấy hóa đơn
router.get('/bill/:orderCode', billController.getBill);

module.exports = router;
