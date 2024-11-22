// backend/controllers/revenueController.js
const revenueModel = require('../../models/admin/revenueModel');

// Doanh thu theo món ăn
const getRevenueByFood = async (req, res) => {
    const { year, month } = req.query;
    try {
        const revenueData = await revenueModel.getRevenueByFood(year, month);
        res.json(revenueData);
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu theo món ăn:', error);
        res.status(500).json({ message: 'Lỗi khi lấy doanh thu theo món ăn', error });
    }
};

// Doanh thu theo bàn
const getRevenueByTable = async (req, res) => {
    const { year, month } = req.query;
    try {
        const revenueData = await revenueModel.getRevenueByTable(year, month);
        res.json(revenueData);
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu theo bàn:', error);
        res.status(500).json({ message: 'Lỗi khi lấy doanh thu theo bàn', error });
    }
};

module.exports = { getRevenueByFood, getRevenueByTable };

