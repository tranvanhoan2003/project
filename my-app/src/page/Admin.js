import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import Dashboard from "../admin/Dashboard";
import Category from "../admin/Category";
import Food from "../admin/Food";
import Table from "../admin/Table";
import Revenue from "../admin/Revenue";
import Employees from "../admin/Employees";
import Bill from "../admin/Bill";
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
        {activePage === "Category" && <Category />}
        {activePage === "Food" && <Food />}
        {activePage === "Table" && <Table/>}
        {activePage === "Revenue" && <Revenue/>}
        {activePage === "Employees" && <Employees/>}
        {activePage === "Bill" && <Bill/>}
        
      </div>
    </div>

  );
}

export default Admin;
