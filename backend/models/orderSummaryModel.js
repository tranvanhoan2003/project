const db = require('../config/db');

const OrderSummary = {
    // Lấy chi tiết đơn hàng theo mã hóa đơn
    getOrderDetailsByCode: (orderCode, callback) => {
        const sql = `
            SELECT 
                order_food.id AS order_id, 
                food.name AS food_name, 
                order_food.quantity, 
                food.price
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
    
    deleteOrderItem: (orderId, orderCode, callback) => {
        const sql = `DELETE FROM order_food WHERE id = ? AND code_id = ?`;
        db.query(sql, [orderId, orderCode], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
    

};

module.exports = OrderSummary;
