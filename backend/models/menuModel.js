// backend/models/menuModel.js
const db = require('../config/db');

const Menu = {
    getAllMenus: (callback) => {
        db.query('SELECT * FROM food', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = Menu;
