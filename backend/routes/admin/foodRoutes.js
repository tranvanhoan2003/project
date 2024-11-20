const express = require("express");
const router = express.Router();
// const foodController = require("../controllers/foodController");
const foodController = require("../../controllers/admin/foodController")

// Lấy danh sách món ăn
router.get("/", foodController.getFoods);

// Thêm món ăn mới
router.post("/", foodController.createFood);

// Cập nhật món ăn
router.put("/:id", foodController.updateFood);

// Xóa món ăn
router.delete("/:id", foodController.deleteFood);

module.exports = router;
