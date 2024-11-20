// import React, { useState, useEffect } from "react";
// import "./Category.css";

// const Category = () => {
//   const [categories, setCategories] = useState([]); // Danh sách category
//   const [formData, setFormData] = useState({ id: "", name: "" }); // Dữ liệu form
//   const [isEditing, setIsEditing] = useState(false); // Trạng thái đang chỉnh sửa

//   // Fetch data từ API giả lập (hoặc từ server thật)
//   useEffect(() => {
//     // Đây là dữ liệu mẫu. Thay bằng API fetch khi cần.
//     const fetchData = async () => {
//       const data = [
//         { id: 1, name: "Danh mục A" },
//         { id: 2, name: "Danh mục B" },
//         { id: 3, name: "Danh mục C" },
//         { id: 4, name: "Danh mục D" },
//       ];
//       setCategories(data);
//     };
//     fetchData();
//   }, []);

//   // Xử lý khi nhập liệu vào form
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Thêm hoặc chỉnh sửa category
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditing) {
//       // Cập nhật category
//       setCategories(
//         categories.map((cat) =>
//           cat.id === formData.id ? { ...cat, name: formData.name } : cat
//         )
//       );
//     } else {
//       // Thêm mới category
//       const newCategory = { id: Date.now(), name: formData.name };
//       setCategories([...categories, newCategory]);
//     }
//     setFormData({ id: "", name: "" });
//     setIsEditing(false);
//   };

//   // Sửa category
//   const handleEdit = (category) => {
//     setFormData(category);
//     setIsEditing(true);
//   };

//   // Xóa category
//   const handleDelete = (id) => {
//     const updatedCategories = categories.filter((cat) => cat.id !== id);
//     setCategories(updatedCategories);
//   };

//   return (
//     <div className="category-container">
//       <h1>Quản lý danh mục</h1>
//       <form onSubmit={handleSubmit} className="category-form">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Nhập tên danh mục"
//           required
//         />
//         <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
//       </form>
//       <table className="category-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tên danh mục</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id}>
//               <td>{category.id}</td>
//               <td>{category.name}</td>
//               <td>
//                 <button onClick={() => handleEdit(category)}>Sửa</button>
//                 <button onClick={() => handleDelete(category.id)}>Xóa</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Category;


import React, { useState, useEffect } from "react";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [formData, setFormData] = useState({ id: "", name: "" }); // Dữ liệu form
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const API_URL = "http://localhost:3001/api/categories"; // Đường dẫn API

  // Fetch danh mục từ server khi load component
  useEffect(() => {
    fetchCategories();
  }, []);

  

  // Hàm lấy danh sách danh mục từ server
  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  // Xử lý khi nhập liệu vào form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Thêm mới hoặc cập nhật danh mục
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Cập nhật danh mục
      try {
        const response = await fetch(`${API_URL}/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: formData.name }),
        });
        if (response.ok) {
          fetchCategories(); // Lấy lại danh sách
          setFormData({ id: "", name: "" });
          setIsEditing(false);
        } else {
          console.error("Cập nhật danh mục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật danh mục:", error);
      }
    } else {
      // Thêm mới danh mục
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: formData.name }),
        });
        if (response.ok) {
          fetchCategories(); // Lấy lại danh sách
          setFormData({ id: "", name: "" });
        } else {
          console.error("Thêm danh mục thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
      }
    }
  };

  // Xử lý chỉnh sửa danh mục
  const handleEdit = (category) => {
    setFormData(category);
    setIsEditing(true);
  };

  // Xử lý xóa danh mục
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchCategories(); // Lấy lại danh sách
      } else {
        console.error("Xóa danh mục thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  return (
    <div className="category-container">
      <h1>Quản lý danh mục</h1>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nhập tên danh mục"
          required
        />
        <button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</button>
      </form>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Sửa</button>
                <button onClick={() => handleDelete(category.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
