import './App.css';
import TableList from './TableList';
import Menu from './Menu';
import OrderSummary from './OrderSummary';
import React, { useState } from 'react';

function App() {

  const [selectedTableName, setSelectedTableName] = useState('');
  const [orderCode, setOrderCode] = useState('');  // Thêm state cho orderCode

  // Hàm để cập nhật tên bàn đã chọn
  const handleTableSelection = (tableName) => {
    setSelectedTableName(tableName); // Cập nhật tên bàn
  };

  // Hàm để cập nhật orderCode từ Menu
  const handleOrderCodeUpdate = (code) => {
    setOrderCode(code); // Cập nhật orderCode khi có thay đổi
  };

  return (
    <div className="app">
      <TableList onTableSelected={handleTableSelection} />
      {/* Truyền selectedTableName và handleOrderCodeUpdate vào Menu */}
      <Menu 
        selectedTableName={selectedTableName} 
        setOrderCode={handleOrderCodeUpdate} 
      />
      {/* Truyền orderCode vào OrderSummary */}
      <OrderSummary 
        selectedTableName={selectedTableName} 
        orderCode={orderCode} 
      />
    </div>
  );
}

export default App;
