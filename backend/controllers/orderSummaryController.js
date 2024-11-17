const OrderSummary = require('../models/orderSummaryModel');

const orderSummaryController = {
    // Lấy chi tiết đơn hàng theo mã hóa đơn
    getOrderDetails: (req, res) => {
        const { orderCode } = req.query;
        OrderSummary.getOrderDetailsByCode(orderCode, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    // Cập nhật trạng thái đơn hàng thành 'paid' và thay đổi trạng thái bảng
    updateOrderStatus: (req, res) => {
        const { orderCode, tableName } = req.body; // Lấy cả orderCode và tableName từ body

        // Cập nhật trạng thái đơn hàng thành 'paid'
        OrderSummary.updateOrderStatusByCode(orderCode, (err, results) => {
            if (err) {
                console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
                return res.status(500).json({ message: 'Lỗi máy chủ.' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Không tìm thấy đơn hàng với mã hóa đơn này.' });
            }

            // Sau khi cập nhật trạng thái đơn hàng, cập nhật trạng thái bảng
            OrderSummary.updateTableStatusByName(tableName, (err, results) => {
                if (err) {
                    console.error('Lỗi khi cập nhật trạng thái bàn:', err);
                    return res.status(500).json({ message: 'Lỗi máy chủ khi cập nhật trạng thái bàn.' });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: 'Không tìm thấy bàn này hoặc bàn không bị chiếm dụng.' });
                }
                res.json({ message: 'Trạng thái đơn hàng và bàn đã được cập nhật thành công.' });
            });
        });
    },
};

module.exports = orderSummaryController;
