import './App.css';
import TableList from './TableList';
// import Menu from './Menu';
import Menu from './Menu';
import OrderSummary from './OrderSummary';
import React, { useState } from 'react';

function App() {

  const [selectedTableName, setSelectedTableName] = useState('');
  const [orderCode, setOrderCode] = useState('');  // Thêm state cho orderCode
  const [orderUpdateTrigger, setOrderUpdateTrigger] = useState(0);

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
      <TableList 
      onTableSelected={handleTableSelection} />
      
      
      <Menu 
        selectedTableName={selectedTableName} 
        setOrderCode={handleOrderCodeUpdate} 
        setOrderUpdateTrigger={setOrderUpdateTrigger}
      />
      {/* Truyền orderCode vào OrderSummary */}
      <OrderSummary 
        selectedTableName={selectedTableName} 
        orderCode={orderCode} 
        orderUpdateTrigger={orderUpdateTrigger}
      />
    </div>
  );
}

export default App;



