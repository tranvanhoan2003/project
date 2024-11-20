
import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <p>Online</p>
      <div className="menu-list">
        <button className="menu-btn" onClick={() => onMenuClick("Dashboard")}>
          Trang chủ
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Category")}>
          Category
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Food")}>
          Food
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Table")}>
          Table
        </button>
        <button className="menu-btn">Hình ảnh</button>
        <button className="menu-btn">Cấu hình</button>
        <button className="menu-btn">Đơn hàng</button>
        <button className="menu-btn">Thành viên</button>
        <button className="menu-btn">Liên hệ</button>
      </div>
    </div>
  );
};

export default Sidebar;