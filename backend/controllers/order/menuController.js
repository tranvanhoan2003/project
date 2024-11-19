// // backend/controllers/menuController.js
// // const Menu = require('../../models/order/menuModel');
// const Menu = require('../../models/order/orderModel');

// const menuController = {
//     getAllMenus: (req, res) => {
//         Menu.getAllMenus((err, menus) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.json(menus);
//         });
//     }
// };

// module.exports = menuController;

const Menu = require('../../models/order/menuModel');

const menuController = {
    getAllMenus: (req, res) => {
        Menu.getAllMenus((err, menus) => {
            if (err) {
                console.error('Error fetching menus:', err);
                return res.status(500).json({ error: 'Failed to fetch menus.' });
            }
            res.json(menus);
        });
    },
};

module.exports = menuController;

