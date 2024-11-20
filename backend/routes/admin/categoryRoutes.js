const express = require("express");
// const categoryController = require("../controllers/categoryController");
const categoryController = require("../../controllers/admin/categoryController")

const router = express.Router();

// Lấy danh sách tất cả các danh mục
router.get("/", categoryController.getCategories);

// Thêm một danh mục mới
router.post("/", categoryController.createCategory);

// Cập nhật một danh mục
router.put("/:id", categoryController.updateCategory);

// Xóa một danh mục
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
