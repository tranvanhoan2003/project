// controllers/orderController.js
// const Order = require('../../models/order/orderModel');
const Order = require('../../models/order/orderModel');

exports.createOrder = (req, res) => {
    const { table_id, status } = req.body;
    Order.create(table_id, status, (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi tạo order' });
        } else {
            res.status(201).json({ message: 'Order đã được tạo thành công!' });
        }
    });
};
