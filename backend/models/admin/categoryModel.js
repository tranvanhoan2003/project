// const db = require("../config/db"); // Import kết nối database
const db = require("../../config/db")

// Lấy tất cả danh mục
const getAllCategories = (callback) => {
  const query = "SELECT * FROM category";
  db.query(query, callback);
};

// Thêm một danh mục mới
const addCategory = (name, callback) => {
  const query = "INSERT INTO category (name) VALUES (?)";
  db.query(query, [name], callback);
};

// Cập nhật danh mục theo ID
const updateCategory = (id, name, callback) => {
  const query = "UPDATE category SET name = ? WHERE id = ?";
  db.query(query, [name, id], callback);
};

// Xóa danh mục theo ID
const deleteCategory = (id, callback) => {
  const query = "DELETE FROM category WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
