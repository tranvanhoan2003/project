// const db = require('../config/db');

// const OrderSummary = {
//     getOrderDetailsByCode: (orderCode, callback) => {
//         const sql = `
//             SELECT food.name AS food_name, order_food.quantity, food.price
//             FROM order_food
//             JOIN food ON order_food.food_id = food.id
//             WHERE order_food.code_id = ?;
//         `;
//         db.query(sql, [orderCode], (err, results) => {
//             if (err) {
//                 return callback(err);
//             }
//             callback(null, results);
//         });
//     },
    
// };

// module.exports = OrderSummary;


const db = require('../config/db');

const OrderSummary = {
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

    updateOrderStatusByCode: (orderCode, callback) => {
        const sql = 'UPDATE orders SET status = "paid" WHERE code = ?';
        db.query(sql, [orderCode], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = OrderSummary;
