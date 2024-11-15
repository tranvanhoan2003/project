// backend/routes/menuRoutes.js
const express = require('express');
const menuController = require('../controllers/menuController');

const router = express.Router();

router.get('/names', menuController.getAllMenus);

module.exports = router;
