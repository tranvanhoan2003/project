
import React, { useState, useEffect } from 'react';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        address: '',
        position: '',
        department: '',
        salary: '',
        hire_date: '',
        status: 'active',
    });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch employees from backend
    useEffect(() => {
        fetch('http://localhost:3001/api/employees')
            .then(response => response.json())
            .then(data => setEmployees(data))
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add or update employee
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isEditing
            ? `http://localhost:3001/api/employees/${formData.id}`
            : 'http://localhost:3001/api/employees';
        const method = isEditing ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (isEditing) {
                    setEmployees(employees.map(emp => (emp.id === data.id ? data : emp)));
                } else {
                    setEmployees([...employees, data]);
                }
                resetForm();
            })
            .catch(error => console.error('Error saving employee:', error));
    };

    // Edit an employee
    const handleEdit = (employee) => {
        setFormData(employee);
        setIsEditing(true);
    };

    // Delete an employee
    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
            fetch(`http://localhost:3001/api/employees/${id}`, { method: 'DELETE' })
                .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
                .catch(error => console.error('Error deleting employee:', error));
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: null,
            name: '',
            email: '',
            phone: '',
            address: '',
            position: '',
            department: '',
            salary: '',
            hire_date: '',
            status: 'active',
        });
        setIsEditing(false);
    };

    // Format hire date
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    };

    return (
        <div className="employee-manager">
            <h2>Quản lý nhân viên</h2>

            {/* Form thêm/sửa nhân viên */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Họ tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Chức vụ"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Phòng ban"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="salary"
                    placeholder="Lương"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="hire_date"
                    value={formData.hire_date}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                >
                    <option value="active">Đang làm việc</option>
                    <option value="inactive">Đã nghỉ việc</option>
                </select>
                <button type="submit">{isEditing ? 'Cập nhật' : 'Thêm mới'}</button>
                {isEditing && <button onClick={resetForm}>Hủy</button>}
            </form>

            {/* Danh sách nhân viên */}
            <table>
                <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Phòng ban</th>
                        <th>Lương</th>
                        <th>Ngày tuyển dụng</th> {/* New column for hire date */}
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.department}</td>
                            <td>{employee.salary.toLocaleString()} VNĐ</td>
                            <td>{formatDate(employee.hire_date)}</td> {/* Display formatted hire date */}
                            <td>{employee.status === 'active' ? 'Đang làm việc' : 'Đã nghỉ việc'}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Sửa</button>
                                <button onClick={() => handleDelete(employee.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
