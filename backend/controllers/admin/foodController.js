// const foodModel = require("../models/foodModel");
const foodModel = require("../../models/admin/foodModel")

// Lấy danh sách món ăn
const getFoods = (req, res) => {
  foodModel.getFoods((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server khi lấy danh sách món ăn." });
    } else {
      res.json(results);
    }
  });
};

// Thêm món ăn
const createFood = (req, res) => {
  const { name, price, category_id } = req.body;
  if (!name || !price || !category_id) {
    return res.status(400).json({ error: "Thiếu thông tin món ăn." });
  }
  foodModel.createFood({ name, price, category_id }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server khi thêm món ăn." });
    } else {
      res.json({ message: "Thêm món ăn thành công.", id: result.insertId });
    }
  });
};

// Cập nhật món ăn
const updateFood = (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;
  if (!name || !price || !category_id) {
    return res.status(400).json({ error: "Thiếu thông tin món ăn để cập nhật." });
  }
  foodModel.updateFood(id, { name, price, category_id }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server khi cập nhật món ăn." });
    } else {
      res.json({ message: "Cập nhật món ăn thành công." });
    }
  });
};

// Xóa món ăn
const deleteFood = (req, res) => {
  const { id } = req.params;
  foodModel.deleteFood(id, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Lỗi server khi xóa món ăn." });
    } else {
      res.json({ message: "Xóa món ăn thành công." });
    }
  });
};

module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
};
