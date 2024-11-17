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
                    }
                })
                .catch((error) => console.error('Lỗi khi cập nhật trạng thái:', error));
        } else {
            alert('Không có mã hóa đơn hoặc tên bàn để thanh toán!');
        }
    };
    



    return (
        <div className="order-summary">
            <h3>Thông tin hóa đơn: {selectedTableName || 'Chưa chọn bàn'}</h3>
            <h3>Mã hóa đơn: {orderCode || 'Chưa có mã'}</h3>
            <div className="abc">
                <h4>Tên món</h4>
                <h4>Số lượng</h4>
                <h4>Đơn giá</h4>
                <h4>Thành tiền</h4>
            </div>
            {orderDetails.length > 0 ? (
                <div className="order-items">
                    {orderDetails.map((item, index) => (
                        <div className="order-item" key={index}>
                            <div className="order-name">{item.food_name}</div>
                            <div className="order-quantity">{item.quantity}</div>
                            <div className="order-price">${item.price.toFixed(2)}</div>
                            <div className="order-total">${(item.quantity * item.price).toFixed(2)}</div>
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
                 <button className="green-button">Khóa màn</button>
                 <button className="pay-button" onClick={handlePayment}>Thanh toán</button>
                 <button className="info-button">Thông báo</button>
             </div>
        </div>
    );
}

export default OrderSummary;



