const employeeModel = require('../../models/admin/employeeModel');

// Lấy danh sách nhân viên
const getEmployees = (req, res) => {
    employeeModel.getAllEmployees((err, employees) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi lấy danh sách nhân viên' });
        }
        res.json(employees);
    });
};

// Thêm nhân viên mới
const createEmployee = (req, res) => {
    const newEmployee = req.body;
    employeeModel.addEmployee(newEmployee, (err, employee) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi thêm nhân viên' });
        }
        res.status(201).json(employee);
    });
};

// Cập nhật nhân viên
const updateEmployee = (req, res) => {
    const id = req.params.id;
    const updatedEmployee = req.body;
    employeeModel.updateEmployee(id, updatedEmployee, (err, employee) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi cập nhật nhân viên' });
        }
        res.json(employee);
    });
};

// Xóa nhân viên
const deleteEmployee = (req, res) => {
    const id = req.params.id;
    employeeModel.deleteEmployee(id, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi khi xóa nhân viên' });
        }
        res.json({ message: 'Xóa nhân viên thành công' });
    });
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
