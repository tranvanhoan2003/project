// // backend/models/menuModel.js
// const db = require('../../config/db');

// const Menu = {
//     getAllMenus: (callback) => {
//         db.query('SELECT * FROM food', (err, results) => {
//             if (err) {
//                 return callback(err, null);
//             }
//             callback(null, results);
//         });
//     }
// };

// module.exports = Menu;

const db = require('../../config/db');

const Menu = {
    getAllMenus: (callback) => {
        const query = 'SELECT id, name, price, category_id FROM food';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Menu;

