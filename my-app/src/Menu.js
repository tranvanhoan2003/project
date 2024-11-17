import React, { useEffect, useState } from 'react';
import './Menu.css';

function Menu({ selectedTableName, setOrderCode, setOrderUpdateTrigger }) {
    const [menuItems, setMenuItems] = useState([]);
    const [orderCode, setOrderCodeLocal] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/menus/names')
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error('Error fetching data:', error));

        if (selectedTableName) {
            fetch(`http://localhost:3001/api/order_food/code?tableName=${selectedTableName}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.code) {
                        setOrderCodeLocal(data.code);
                        setOrderCode(data.code);
                    } else {
                        alert('Không tìm thấy mã đơn hàng cho bàn này.');
                    }
                })
                .catch((error) => console.error('Error fetching order code:', error));
        }
    }, [selectedTableName, setOrderCode]);

    const handleAddToCart = (item, quantityInput) => {
        const quantity = parseInt(quantityInput.value, 10) || 1;
        if (selectedTableName) {
            if (!orderCode) {
                alert('Vui lòng xác nhận đơn hàng trước khi thêm món.');
                return;
            }
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
                    setOrderUpdateTrigger((prev) => prev + 1); // Tăng giá trị trigger để thông báo cập nhật
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
                                defaultValue={1}
                                ref={(input) => (item.quantityInput = input)}
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
