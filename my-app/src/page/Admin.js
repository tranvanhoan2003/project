import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import Dashboard from "../admin/Dashboard";
import Menu from "../admin/Menu";
import "./Admin.css"; 

function Admin() {
  const [activePage, setActivePage] = useState("Dashboard"); // State quản lý trang đang hiển thị

  // Hàm để thay đổi trạng thái trang
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar onMenuClick={handlePageChange} /> {/* Truyền hàm thay đổi trang vào Sidebar */}
      <div className="main-content">
        {activePage === "Dashboard" && <Dashboard />}
        {activePage === "Menu" && <Menu />}
      </div>
    </div>

  );
}

export default Admin;
