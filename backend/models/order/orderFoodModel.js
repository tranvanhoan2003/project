const db = require('../../config/db');  // Kết nối cơ sở dữ liệu từ config
const orderFoodModel = {};

// Hàm thêm món ăn vào bảng order_food
orderFoodModel.createOrderFood = (code_id, food_id, quantity, callback) => {
    const query = `
        INSERT INTO order_food (code_id, food_id, quantity)
        VALUES (?, ?, ?)
    `;
    db.query(query, [code_id, food_id, quantity], (error, results) => {
        if (error) {
            console.error("Lỗi khi thêm vào order_food:", error);
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
};

// Hàm lấy code từ bảng orders dựa trên table_id
orderFoodModel.getOrderCodeByTableName = (tableName, callback) => {
    const query = `
        SELECT o.code 
        FROM orders AS o
        JOIN tables AS t ON o.table_id = t.id
        WHERE t.name = ? AND o.status = 'notPaid'
    `;
    db.query(query, [tableName], (error, results) => {
        if (error) {
            console.error("Lỗi khi lấy mã đơn hàng:", error);
            callback(error, null);
        } else {
            callback(null, results[0]);
        }
    });
};

module.exports = orderFoodModel;
