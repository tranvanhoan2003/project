
// backend/models/revenueModel.js
const db = require('../../config/db');

// Doanh thu theo món ăn
const getRevenueByFood = (year, month) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                f.name AS food_name,
                SUM(ofd.quantity) AS total_sold,
                SUM(f.price * ofd.quantity) AS total_revenue
            FROM orders o
            JOIN order_food ofd ON o.code = ofd.code_id
            JOIN food f ON f.id = ofd.food_id
            WHERE o.status = 'paid'
            AND YEAR(o.order_time) = ? 
            AND MONTH(o.order_time) = ?
            GROUP BY f.name
            ORDER BY total_revenue DESC;
        `;
        db.query(query, [year, month], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Doanh thu theo bàn
const getRevenueByTable = (year, month) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                t.name AS table_name,
                COUNT(o.id) AS total_orders,
                SUM(f.price * ofd.quantity) AS total_revenue
            FROM orders o
            JOIN order_food ofd ON o.code = ofd.code_id
            JOIN food f ON f.id = ofd.food_id
            JOIN tables t ON t.id = o.table_id
            WHERE o.status = 'paid'
            AND YEAR(o.order_time) = ?
            AND MONTH(o.order_time) = ?
            GROUP BY t.name
            ORDER BY total_revenue DESC;
        `;
        db.query(query, [year, month], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { getRevenueByFood, getRevenueByTable };

