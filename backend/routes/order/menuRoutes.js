// // backend/routes/menuRoutes.js
// const express = require('express');
// // const menuController = require('../controllers/menuController');
// const menuController = require('../../controllers/order/menuController');

// const router = express.Router();

// router.get('/names', menuController.getAllMenus);

// module.exports = router;

const express = require('express');
const menuController = require('../../controllers/order/menuController');

const router = express.Router();

// Route to get all menu items
router.get('/names', menuController.getAllMenus);

module.exports = router;

