
import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <p>Online</p>
      <div className="menu-list">
        <button className="menu-btn" onClick={() => onMenuClick("Dashboard")}>
          Trang Chủ
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Category")}>
          {/* Category */}
          Danh Mục
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Food")}>
          {/* Food */}
          Món Ăn
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Table")}>
          {/* Table */}
          Bàn
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Revenue")}>
          {/* Revenue */}
          Doanh Thu
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Employees")}>
          {/* Employees */}
          Nhân Viên
        </button>
        <button className="menu-btn" onClick={() => onMenuClick("Bill")}>
          {/* Bill */}
          Hóa Đơn
        </button>
        <button className="menu-btn">Thành viên</button>
        <button className="menu-btn">Liên hệ</button>
      </div>
    </div>
  );
};

export default Sidebar;