// const OrderSummary = require('../models/orderSummaryModel');

// const orderSummaryController = {
//     getOrderDetails: (req, res) => {
//         const { orderCode } = req.query;
//         OrderSummary.getOrderDetailsByCode(orderCode, (err, results) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             res.json(results);
//         });
//     },
// };

// module.exports = orderSummaryController;



const OrderSummary = require('../models/orderSummaryModel');

const orderSummaryController = {
    getOrderDetails: (req, res) => {
        const { orderCode } = req.query;
        OrderSummary.getOrderDetailsByCode(orderCode, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    updateOrderStatus: (req, res) => {
        const { orderCode } = req.body;

        OrderSummary.updateOrderStatusByCode(orderCode, (err, results) => {
            if (err) {
                console.error('Lỗi khi cập nhật trạng thái:', err);
                return res.status(500).json({ message: 'Lỗi máy chủ.' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng với mã hóa đơn này.' });
            }
            res.json({ message: 'Trạng thái đã được cập nhật thành công.' });
        });
    },
};

module.exports = orderSummaryController;



