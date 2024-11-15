// models/orderModel.js
const db = require('../config/db');

const Order = {
    create: (tableId, status, callback) => {
        const query = 'INSERT INTO orders (table_id, status) VALUES (?, ?)';
        db.query(query, [tableId, status], (error, results) => {
            if (error) {
                console.error('Lỗi khi tạo order:', error);
                callback(error, null);
            } else {
                callback(null, results);
            }
        });
    },
    
    // Thêm các phương thức khác nếu cần, ví dụ như lấy danh sách orders, cập nhật trạng thái,...
};

module.exports = Order;
