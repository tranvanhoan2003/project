// controllers/tableController.js
const tableModel = require('../../models/admin/tableModel');

// Lấy tất cả các table
const getTables = async (req, res) => {
  try {
    const tables = await tableModel.getAllTables();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách bảng', error: err });
  }
};

// Lấy table theo ID
const getTable = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await tableModel.getTableById(id);
    if (!table) {
      return res.status(404).json({ message: 'Table không tồn tại' });
    }
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin bảng', error: err });
  }
};

// Thêm table mới
const createTable = async (req, res) => {
  const { name, status } = req.body;
  try {
    await tableModel.createTable(name, status);
    res.status(201).json({ message: 'Table đã được thêm thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm bảng', error: err });
  }
};

// Cập nhật table
const updateTable = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    await tableModel.updateTable(id, name, status);
    res.status(200).json({ message: 'Table đã được cập nhật' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật bảng', error: err });
  }
};

// Xóa table
const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    await tableModel.deleteTable(id);
    res.status(200).json({ message: 'Table đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa bảng', error: err });
  }
};

module.exports = {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable
};
