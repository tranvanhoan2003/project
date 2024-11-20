// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/admin/tableController');

// Lấy tất cả các table
router.get('/', tableController.getTables);

// Lấy table theo ID
router.get('/:id', tableController.getTable);

// Thêm table mới
router.post('/', tableController.createTable);

// Cập nhật table
router.put('/:id', tableController.updateTable);

// Xóa table
router.delete('/:id', tableController.deleteTable);

module.exports = router;
