
import React, { useState, useEffect } from "react";
import "./Table.css";

const Table = () => {
  const [tables, setTables] = useState([]); // Danh sách các bảng
  const [formData, setFormData] = useState({ id: "", name: "", status: "available" }); // Dữ liệu form
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  // Lấy danh sách các bảng từ backend
  const fetchTables = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/tables");
      const data = await response.json();
      setTables(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu bảng:", err);
    }
  };

  // Gọi hàm lấy danh sách bảng khi component mount
  useEffect(() => {
    fetchTables();
  }, []);

  // Xử lý nhập liệu form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Thêm mới hoặc cập nhật bảng
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Cập nhật bảng
      try {
        await fetch(`http://localhost:3001/api/tables/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            status: formData.status,
          }),
        });
        fetchTables();
      } catch (err) {
        console.error("Lỗi khi cập nhật bảng:", err);
      }
    } else {
      // Thêm bảng mới
      try {
        await fetch("http://localhost:3001/api/tables", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            status: formData.status,
          }),
        });
        fetchTables();
      } catch (err) {
        console.error("Lỗi khi thêm bảng:", err);
      }
    }

    setFormData({ id: "", name: "", status: "available" });
    setIsEditing(false);
  };

  // Chuyển sang chế độ chỉnh sửa bảng
  const handleEdit = (table) => {
    setFormData({ id: table.id, name: table.name, status: table.status });
    setIsEditing(true);
  };

  // Xóa bảng
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/tables/${id}`, {
        method: "DELETE",
      });
      fetchTables();
    } catch (err) {
      console.error("Lỗi khi xóa bảng:", err);
    }
  };

  return (
    <div className="table-container">
      <h1>Quản lý Bảng</h1>

      <form onSubmit={handleSubmit} className="table-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên Bảng"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      <table className="table-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Bảng</th>
            <th>Trạng Thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.name}</td>
              <td>{table.status}</td>
              <td>
                <button onClick={() => handleEdit(table)}>Sửa</button>
                <button onClick={() => handleDelete(table.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
