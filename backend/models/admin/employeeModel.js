const db = require('../../config/db'); // Kết nối database

// Lấy tất cả nhân viên
const getAllEmployees = (callback) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Thêm nhân viên mới
const addEmployee = (employee, callback) => {
    const query = `
        INSERT INTO employees (name, email, phone, address, position, department, salary, hire_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        employee.name, 
        employee.email, 
        employee.phone, 
        employee.address, 
        employee.position, 
        employee.department, 
        employee.salary, 
        employee.hire_date, 
        employee.status,
    ];
    db.query(query, values, (err, result) => {
        if (err) return callback(err);
        callback(null, { id: result.insertId, ...employee });
    });
};

// Cập nhật thông tin nhân viên
const updateEmployee = (id, employee, callback) => {
    const query = `
        UPDATE employees
        SET name = ?, email = ?, phone = ?, address = ?, position = ?, department = ?, salary = ?, hire_date = ?, status = ?
        WHERE id = ?
    `;
    const values = [
        employee.name, 
        employee.email, 
        employee.phone, 
        employee.address, 
        employee.position, 
        employee.department, 
        employee.salary, 
        employee.hire_date, 
        employee.status,
        id,
    ];
    db.query(query, values, (err, result) => {
        if (err) return callback(err);
        callback(null, { id, ...employee });
    });
};

// Xóa nhân viên
const deleteEmployee = (id, callback) => {
    const query = 'DELETE FROM employees WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};
