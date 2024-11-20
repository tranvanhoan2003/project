import React, { useState, useEffect } from "react";
import "./Food.css";

const Food = () => {
  const [foods, setFoods] = useState([]); // Danh sách món ăn
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [formData, setFormData] = useState({ id: "", name: "", price: "", category_id: "" }); // Dữ liệu form
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa

  // Lấy dữ liệu món ăn và danh mục khi load trang
  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  // Lấy danh sách món ăn từ API
  const fetchFoods = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/foods");
      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách món ăn:", error);
    }
  };

  // Lấy danh sách danh mục từ API
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
    }
  };

  // Xử lý nhập liệu trong form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Thêm mới hoặc cập nhật món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Cập nhật món ăn
      try {
        await fetch(`http://localhost:3001/api/foods/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        fetchFoods();
        resetForm();
      } catch (error) {
        console.error("Lỗi khi cập nhật món ăn:", error);
      }
    } else {
      // Thêm món ăn mới
      try {
        await fetch("http://localhost:3001/api/foods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        fetchFoods();
        resetForm();
      } catch (error) {
        console.error("Lỗi khi thêm món ăn:", error);
      }
    }
  };

  // Xóa món ăn
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/foods/${id}`, { method: "DELETE" });
      fetchFoods();
    } catch (error) {
      console.error("Lỗi khi xóa món ăn:", error);
    }
  };

  // Chuyển sang chế độ chỉnh sửa món ăn
  const handleEdit = (food) => {
    setFormData(food);
    setIsEditing(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: "", name: "", price: "", category_id: "" });
    setIsEditing(false);
  };

  return (
    <div className="food-container">
      <h1>Quản lý món ăn</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tên món ăn"
          required
        />
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Giá tiền"
          required
        />
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>
      <table className="food-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên món ăn</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.id}</td>
              <td>{food.name}</td>
              <td>{food.price.toFixed(2)} đ</td>
              <td>
                {categories.find((cat) => cat.id === food.category_id)?.name || "Không có"}
              </td>
              <td>
                <button onClick={() => handleEdit(food)}>Sửa</button>
                <button onClick={() => handleDelete(food.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Food;
