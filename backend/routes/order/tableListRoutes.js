const express = require('express');
const router = express.Router();
// const tableListController = require('../controllers/tableListController');
const tableListController = require('../../controllers/order/tableListController');

router.get('/names', tableListController.getAllNames);
router.post('/names/update-status', tableListController.updateStatus);
// router.post('/orders/create', tableListController.createOrder); 

module.exports = router;






