import React, { useEffect, useState } from 'react';
import './Menu.css';

function Menu({ selectedTableName, setOrderCode }) {
    const [menuItems, setMenuItems] = useState([]);
    const [orderCode, setOrderCodeLocal] = useState('');

    useEffect(() => {
        // Lấy danh sách món ăn từ backend
        fetch('http://localhost:3001/api/menus/names')
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error('Error fetching data:', error));

        // Lấy mã đơn hàng từ backend dựa trên tên bàn
        if (selectedTableName) {
            fetch(`http://localhost:3001/api/order_food/code?tableName=${selectedTableName}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.code) {
                        setOrderCodeLocal(data.code);  // Cập nhật mã đơn hàng nội bộ
                        setOrderCode(data.code); // Truyền mã đơn hàng lên App.js
                    } else {
                        alert('Không tìm thấy mã đơn hàng cho bàn này.');
                    }
                })
                .catch((error) => console.error('Error fetching order code:', error));
        }
    }, [selectedTableName, setOrderCode]);

    const handleAddToCart = (item, quantityInput) => {
        const quantity = parseInt(quantityInput.value, 10) || 1;  // Sử dụng giá trị từ input, mặc định là 1
        if (selectedTableName) {
            if (!orderCode) {
                alert('Vui lòng xác nhận đơn hàng trước khi thêm món.');
                return;
            }
            // Gửi request thêm món vào giỏ hàng (bảng order_food)
            fetch('http://localhost:3001/api/order_food/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code_id: orderCode, food_id: item.id, quantity: quantity }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(`Đã thêm ${quantity} món ${item.name} vào giỏ hàng!`);
                })
                .catch((error) => console.error('Lỗi khi thêm vào giỏ hàng:', error));
        } else {
            alert('Vui lòng chọn bàn trước khi thêm món!');
        }
    };

    return (
        <div className="menu">
            <h2>hien thi code:{orderCode}</h2>
            <h3>Order cho bàn: {selectedTableName}</h3>
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <div className="menu-item" key={index}>
                        <img src={item.image} alt={item.name} />
                        <div className="menu-item-info">
                            <h4>{item.name}</h4>
                            <p>${item.price.toFixed(2)}</p>
                            <input
                                type="number"
                                min="1"
                                defaultValue={1}  // Mặc định là 1
                                ref={(input) => item.quantityInput = input}  // Lưu tham chiếu tới input
                            />
                            <button onClick={() => handleAddToCart(item, item.quantityInput)}>
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
