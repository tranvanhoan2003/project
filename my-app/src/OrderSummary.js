// import React, { useEffect, useState } from 'react';
// import './OrderSummary.css';

// function OrderSummary({ selectedTableName }) {
//     const [orderCode, setOrderCode] = useState('');
//     const [orderDetails, setOrderDetails] = useState([]);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         if (selectedTableName) {
//             // Gọi API lấy orderCode dựa trên tên bàn đã chọn
//             fetch(`http://localhost:3001/api/order_food/code?tableName=${selectedTableName}`)
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data && data.code) {
//                         setOrderCode(data.code);
//                         // Gọi API lấy thông tin chi tiết từ bảng order_food
//                         fetch(`http://localhost:3001/api/orderSummary/details?orderCode=${data.code}`)
//                             .then((response) => response.json())
//                             .then((orderData) => {
//                                 if (Array.isArray(orderData) && orderData.length > 0) {
//                                     setOrderDetails(orderData);
                                    
//                                     // Tính tổng tiền từ chi tiết đơn hàng
//                                     const totalAmount = orderData.reduce((sum, item) => sum + (item.quantity * item.price), 0);
//                                     setTotal(totalAmount);
//                                 } else {
//                                     setOrderDetails([]); // Xóa chi tiết đơn hàng
//                                     setTotal(0); // Đặt tổng tiền về 0
//                                 }
//                             })
//                             .catch((error) => console.error('Error fetching order details:', error));

//                     } else {
//                         alert('Không tìm thấy mã đơn hàng cho bàn này.');
//                     }
//                 })
//                 .catch((error) => console.error('Error fetching order code:', error));
//         }
//     }, [selectedTableName]);

//     return (
//         <div className="order-summary">
//             <h3>Thông tin hóa đơn: {selectedTableName}</h3>
//             <h3>Mã hóa đơn: {orderCode}</h3>
//             <div className="abc">
//                 <h4>Tên món</h4>
//                 <h4>Số lượng</h4>
//                 <h4>Đơn giá</h4>
//                 <h4>Thành tiền</h4>
//             </div>
//             {orderDetails.length > 0 ? (
//                 <div className="order-items">
//                     {orderDetails.map((order, index) => (
//                         <div className="order-item" key={index}>
//                             <div className="order-name">{order.food_name}</div>
//                             <div className="order-quantity">{order.quantity}</div>
//                             <div className="order-price">${order.price.toFixed(2)}</div>
//                             <div className="order-total">${(order.quantity * order.price).toFixed(2)}</div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>Không có sản phẩm nào trong đơn hàng này.</p>
//             )}
//             {orderDetails.length > 0 && (
//                 <div className="total">
//                     <p>Tổng tiền: ${total.toFixed(2)}</p>
//                 </div>
//             )}
//             <div className="buttons">
//                 <button className="green-button">Khóa màn</button>
//                 <button className="pay-button">Thanh toán</button>
//                 <button className="info-button">Thông báo</button>
//             </div>
//         </div>
//     );
// }

// export default OrderSummary;







// import React from 'react';
// import './OrderSummary.css';

// function OrderSummary({selectedTableName }) {
//   return (
//     <div className="order-summary">
//       <h3>Thông tin hóa đơn:{selectedTableName} </h3>
//       <h3>Mã hóa đơn: </h3> {/* Display the orderCode */}
//       <div className="abc">
//         <h4>Tên món</h4>
//         <h4>Số lượng</h4>
//         <h4>Đơn giá</h4>
//         <h4>Thành tiền</h4>
//       </div>
//       <div className="total">
//         <p>Tổng tiền: </p>
//       </div>
//       <div className="buttons">
//         <button className="green-button">Khóa màn</button>
//         <button className="pay-button">Thanh toán</button>
//         <button className="info-button">Thông báo</button>
//       </div>
//     </div>
//   );
// }

// export default OrderSummary;



import React from 'react';
import './OrderSummary.css';

function OrderSummary({ selectedTableName, orderCode }) {
  return (
    <div className="order-summary">
      <h3>Thông tin hóa đơn: {selectedTableName}</h3>
      <h3>Mã hóa đơn: {orderCode}</h3> {/* Hiển thị mã đơn hàng */}
      <div className="abc">
        <h4>Tên món</h4>
        <h4>Số lượng</h4>
        <h4>Đơn giá</h4>
        <h4>Thành tiền</h4>
      </div>
      <div className="total">
        <p>Tổng tiền: </p>
      </div>
      <div className="buttons">
        <button className="green-button">Khóa màn</button>
        <button className="pay-button">Thanh toán</button>
        <button className="info-button">Thông báo</button>
      </div>
    </div>
  );
}

export default OrderSummary;


















