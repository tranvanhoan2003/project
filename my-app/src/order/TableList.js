import React, { useEffect, useState } from 'react';
import './TableList.css';

function TableList({ onTableSelected }) {
    const [tables, setTables] = useState([]);
    const [selectedTableId, setSelectedTableId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/tables/names')
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error('Lỗi:', error));
    }, []);

    const handleTableClick = (tableId) => {
        console.log("Selected Table ID:", tableId);
        setSelectedTableId(prevId => (prevId === tableId ? null : tableId));
    };

    const handleConfirmClick = () => {
        if (selectedTableId) {
            // Cập nhật trạng thái của bàn
            fetch('http://localhost:3001/api/tables/names/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedTableId, status: 'occupied' }),
            })
            .then(response => response.json())
            .then(data => {
                // alert(data.message);
                setTables(prevTables =>
                    prevTables.map(table =>
                        table.id === selectedTableId ? { ...table, status: 'occupied' } : table
                    )
                );
                const selectedTable = tables.find(table => table.id === selectedTableId);
                onTableSelected(selectedTable ? selectedTable.name : '');
            })
            .catch(error => console.error('Lỗi:', error));


            // Kiểm tra trạng thái của bàn trước khi tạo order
            const selectedTable = tables.find(table => table.id === selectedTableId);
            if (selectedTable && selectedTable.status === 'available') { // Kiểm tra trạng thái "available"
                fetch('http://localhost:3001/api/orders/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ table_id: selectedTableId, status: 'notPaid' }),
                })
                .then(response => response.json())
                .then(data => {
                    alert('Order đã được tạo thành công!');
                })
                .catch(error => console.error('Lỗi:', error));
            } else {
                alert('Bàn này hiện không khả dụng để tạo order.');
            }

        } else {
            alert('Vui lòng chọn một bàn trước.');
        }
    };

    return (
        <div className="table-list">
            <div className="table-header">
                <h3> Danh sách bàn</h3>
            </div>
            <div className="tables">
                {tables.map((table, index) => (
                    <button 
                        className={`table-item ${table.status}`} 
                        key={table.id || index}
                        onClick={() => handleTableClick(table.id)}  
                    >
                        <p>{table.name}</p>
                    </button>
                ))}
                
            </div>

            <button onClick={handleConfirmClick} className="confirm-btn">
                Xác nhận
            </button>

        </div>
    );
}

export default TableList;









