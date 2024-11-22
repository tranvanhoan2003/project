// backend/controllers/billController.js
const billModel = require('../../models/admin/billModel');

// API lấy thông tin hóa đơn theo mã hóa đơn
const getBill = (req, res) => {
  const { orderCode } = req.params;

  billModel.getBillByCode(orderCode, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Hóa đơn không tồn tại' });
    }

    // Tạo cấu trúc dữ liệu cho hóa đơn
    const billData = {
      orderCode: results[0].code,
      tableName: results[0].tableName,
      items: results.map(item => ({
        foodName: item.foodName,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };

    res.json(billData);
  });
};

module.exports = { getBill };
