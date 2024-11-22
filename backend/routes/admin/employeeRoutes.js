const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/admin/employeeController');

// Lấy tất cả nhân viên
router.get('/', employeeController.getEmployees);

// Thêm nhân viên mới
router.post('/', employeeController.createEmployee);

// Cập nhật nhân viên
router.put('/:id', employeeController.updateEmployee);

// Xóa nhân viên
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
