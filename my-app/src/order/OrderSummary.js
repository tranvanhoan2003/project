import React, { useEffect, useState } from 'react';
import './OrderSummary.css';

function OrderSummary({ selectedTableName, orderCode, orderUpdateTrigger }) {
    const [orderDetails, setOrderDetails] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (orderCode) {
            fetch(`http://localhost:3001/api/orderSummary/orderDetails?orderCode=${orderCode}`)
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setOrderDetails(data);
                        const totalAmount = data.reduce((sum, item) => sum + item.quantity * item.price, 0);
                        setTotal(totalAmount);
                    } else {
                        setOrderDetails([]);
                        setTotal(0);
                    }
                })
                .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
        }
    }, [orderCode, orderUpdateTrigger]); // Lắng nghe orderUpdateTrigger để cập nhật

    const handlePayment = () => {
        if (orderCode && selectedTableName) {
            fetch('http://localhost:3001/api/orderSummary/updateStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderCode, tableName: selectedTableName }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message); // Thông báo thành công hoặc thất bại
                        window.location.reload();
                    }
                })
                .catch((error) => console.error('Lỗi khi cập nhật trạng tháiii:', error));
        } else {
            alert('Không có mã hóa đơn hoặc tên bàn để thanh toán!');
        }
    };
    
    
    const handleDeleteItem = (orderId) => {
        if (orderId) {
            fetch('http://localhost:3001/api/orderSummary/deleteOrderItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, orderCode }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message); // Thông báo xóa thành công hoặc lỗi
                        // Cập nhật lại danh sách món ăn sau khi xóa
                        setOrderDetails((prevDetails) =>
                            prevDetails.filter((item) => item.order_id !== orderId)
                        );
                        // Cập nhật lại tổng tiền
                        const updatedTotal = orderDetails
                            .filter((item) => item.order_id !== orderId)
                            .reduce((sum, item) => sum + item.quantity * item.price, 0);
                        setTotal(updatedTotal);
                    }
                })
                .catch((error) => console.error('Lỗi khi xóa món ăn:', error));
        }
    };
    


    return (
        <div className="order-summary">
            <div className="bill-info">
                <h3 className="bill-info__item">Mã hóa đơn: {orderCode}</h3>
                <h3 className="bill-info__item">Bàn: {selectedTableName}</h3>
            </div>
            <div className="abc">
                <h4>id</h4>
                <h4>Tên món</h4>
                <h4>Số lượng</h4>
                <h4>Đơn giá</h4>
                <h4>Thành tiền</h4>
                <h4>delete</h4>
            </div>
            {orderDetails.length > 0 ? (
                <div className="order-items">
                    {orderDetails.map((item, index) => (
                        <div className="order-item" key={index}>
                            <div className="order-id">{item.order_id}</div>
                            <div className="order-name">{item.food_name}</div>
                            <div className="order-quantity">{item.quantity}</div>
                            <div className="order-price">${item.price.toFixed(2)}</div>
                            <div className="order-total">${(item.quantity * item.price).toFixed(2)}</div>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteItem(item.order_id)} // Gọi hàm với `order_id`
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Chưa có sản phẩm nào trong đơn hàng này.</p>
            )}
            {orderDetails.length > 0 && (
                <div className="total">
                    <p>Tổng tiền: ${total.toFixed(2)}</p>
                </div>
            )}
            <div className="buttons">
                 <button className="pay-button" onClick={handlePayment}>Thanh toán</button>
             </div>
             
        </div>
    );
}

export default OrderSummary;




