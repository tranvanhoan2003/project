const db = require('../../config/db');

const Name = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM tables'; // Thay đổi tên bảng
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    updateStatus: (id, status, callback) => {
        const sql = 'UPDATE tables SET status = ? WHERE id = ?';
        db.query(sql, [status, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
    createOrder: (table_id, status, callback) => {
        const sql = 'INSERT INTO orders (table_id, status) VALUES (?, ?)';
        db.query(sql, [table_id, status], (err, results) => {
            if (err) {
                return callback(err);
            }
            const orderCode = results.insertId;  // Mã đơn hàng là ID của bản ghi mới
            callback(null, { code: orderCode });  // Trả về mã đơn hàng vừa tạo
        });
    }
};

module.exports = Name;
