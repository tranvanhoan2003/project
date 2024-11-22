// backend/models/billModel.js
const db = require('../../config/db');  // Giả sử bạn đã có tệp cấu hình cơ sở dữ liệu

// Hàm lấy hóa đơn theo mã hóa đơn
const getBillByCode = (orderCode, callback) => {
  const query = `
    SELECT o.code, t.name AS tableName, o.status, oi.food_id, oi.quantity, f.name AS foodName, f.price AS unitPrice
    FROM orders o
    JOIN tables t ON o.table_id = t.id
    LEFT JOIN order_food oi ON o.code = oi.code_id
    LEFT JOIN food f ON oi.food_id = f.id
    WHERE o.code = ?;
  `;

  db.query(query, [orderCode], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { getBillByCode };
