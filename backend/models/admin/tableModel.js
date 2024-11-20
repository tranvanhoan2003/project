// models/tableModel.js
const db = require('../../config/db'); // Import cấu hình kết nối cơ sở dữ liệu

// Lấy tất cả các table
const getAllTables = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tables', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Lấy table theo ID
const getTableById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tables WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// Thêm mới table
const createTable = (name, status) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO tables (name, status) VALUES (?, ?)', [name, status], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Cập nhật table
const updateTable = (id, name, status) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE tables SET name = ?, status = ? WHERE id = ?', [name, status, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Xóa table
const deleteTable = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM tables WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable
};
