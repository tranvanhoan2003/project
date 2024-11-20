// const categoryModel = require("../models/categoryModel");
const categoryModel = require("../../models/admin/categoryModel")

// Lấy danh sách tất cả các danh mục
const getCategories = (req, res) => {
  categoryModel.getAllCategories((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục." });
    } else {
      res.status(200).json(results);
    }
  });
};

// Thêm một danh mục mới
const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Tên danh mục không được để trống." });
  }
  categoryModel.addCategory(name, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi thêm danh mục." });
    } else {
      res.status(201).json({ message: "Thêm danh mục thành công.", id: results.insertId });
    }
  });
};

// Cập nhật một danh mục
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Tên danh mục không được để trống." });
  }
  categoryModel.updateCategory(id, name, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi cập nhật danh mục." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Danh mục không tồn tại." });
    } else {
      res.status(200).json({ message: "Cập nhật danh mục thành công." });
    }
  });
};

// Xóa một danh mục
const deleteCategory = (req, res) => {
  const { id } = req.params;
  categoryModel.deleteCategory(id, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi xóa danh mục." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Danh mục không tồn tại." });
    } else {
      res.status(200).json({ message: "Xóa danh mục thành công." });
    }
  });
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
