// backend/controllers/menuController.js
const Menu = require('../models/menuModel');

const menuController = {
    getAllMenus: (req, res) => {
        Menu.getAllMenus((err, menus) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(menus);
        });
    }
};

module.exports = menuController;
