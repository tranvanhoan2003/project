const db = require("../../config/db"); // Kết nối tới MySQL

// Lấy danh sách món ăn
const getFoods = (callback) => {
  const query = `
    SELECT food.id, food.name, food.price, food.category_id, category.name AS category_name
    FROM food
    LEFT JOIN category ON food.category_id = category.id
  `;
  db.query(query, callback);
};

// Thêm mới món ăn
const createFood = (data, callback) => {
  const query = "INSERT INTO food (name, price, category_id) VALUES (?, ?, ?)";
  db.query(query, [data.name, data.price, data.category_id], callback);
};

// Cập nhật món ăn
const updateFood = (id, data, callback) => {
  const query = "UPDATE food SET name = ?, price = ?, category_id = ? WHERE id = ?";
  db.query(query, [data.name, data.price, data.category_id, id], callback);
};

// Xóa món ăn
const deleteFood = (id, callback) => {
  const query = "DELETE FROM food WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
};
