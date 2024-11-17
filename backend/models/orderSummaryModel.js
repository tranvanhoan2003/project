const db = require('../config/db');

const OrderSummary = {
    // Lấy chi tiết đơn hàng theo mã hóa đơn
    getOrderDetailsByCode: (orderCode, callback) => {
        const sql = `
            SELECT food.name AS food_name, order_food.quantity, food.price
            FROM order_food
            JOIN food ON order_food.food_id = food.id
            WHERE order_food.code_id = ?;
        `;
        db.query(sql, [orderCode], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Cập nhật trạng thái đơn hàng thành 'paid'
    updateOrderStatusByCode: (orderCode, callback) => {
        const sql = 'UPDATE orders SET status = "paid" WHERE code = ?';
        db.query(sql, [orderCode], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Cập nhật status của bảng từ 'occupied' thành 'available'
    updateTableStatusByName: (tableName, callback) => {
        const sql = 'UPDATE tables SET status = "available" WHERE name = ? AND status = "occupied"';
        db.query(sql, [tableName], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = OrderSummary;
