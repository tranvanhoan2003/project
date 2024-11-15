const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Thay đổi nếu bạn có tài khoản khác
    password: '', // Mật khẩu của MySQL
    database: 'abc' // Tên cơ sở dữ liệu của bạn
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
