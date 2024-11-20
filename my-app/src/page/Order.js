import React, { useState } from 'react';
import './Order.css'; // Nếu có CSS riêng
import TableList from '../order/TableList'; // Đường dẫn tới TableList
import Menu from '../order/Menu'; // Đường dẫn tới Menu
import OrderSummary from '../order/OrderSummary'; // Đường dẫn tới OrderSummary

const Order = () => {
  const [selectedTableName, setSelectedTableName] = useState('');
  const [orderCode, setOrderCode] = useState(''); // State cho orderCode
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
    <div className="order-management">
      <TableList onTableSelected={handleTableSelection} />
      <Menu
        selectedTableName={selectedTableName}
        setOrderCode={handleOrderCodeUpdate}
        setOrderUpdateTrigger={setOrderUpdateTrigger}
      />
      <OrderSummary
        selectedTableName={selectedTableName}
        orderCode={orderCode}
        orderUpdateTrigger={orderUpdateTrigger}
      />
    </div>
  );
};

export default Order;
