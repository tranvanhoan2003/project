// const orderFoodModel = require('../../models/order/orderFoodModel');
const orderFoodModel = require('../../models/order/orderFoodModel');

// Hàm thêm món vào giỏ hàng (bảng order_food)
exports.createOrderFood = (req, res) => {
    const { code_id, food_id, quantity } = req.body;
    orderFoodModel.createOrderFood(code_id, food_id, quantity, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng.' });
        } else {
            res.status(201).json({ message: 'Thêm vào giỏ hàng thành công!' });
        }
    });
};

// Hàm lấy mã đơn hàng dựa trên tên bàn
exports.getOrderCodeByTableName = (req, res) => {
    const tableName = req.query.tableName;
    orderFoodModel.getOrderCodeByTableName(tableName, (error, result) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi lấy mã đơn hàng.' });
        } else if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Không tìm thấy mã đơn hàng.' });
        }
    });
};
