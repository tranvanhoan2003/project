import React, { useEffect, useState } from 'react';
import './Revenue.css';  // Import file CSS

const RevenueSummary = () => {
    const [revenueByFood, setRevenueByFood] = useState([]);
    const [revenueByTable, setRevenueByTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(2024); // Default year
    const [month, setMonth] = useState(1); // Default month (January)
    const [viewType, setViewType] = useState('table'); // Default view type (doanh thu theo bàn)

    useEffect(() => {
        // Lấy doanh thu theo món ăn hoặc bàn tùy thuộc vào `viewType`
        const url = viewType === 'table'
            ? `http://localhost:3001/api/revenue/by-table?year=${year}&month=${month}`
            : `http://localhost:3001/api/revenue/by-food?year=${year}&month=${month}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (viewType === 'table') {
                    setRevenueByTable(data);
                } else {
                    setRevenueByFood(data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Lỗi khi lấy doanh thu:', error);
                setLoading(false);
            });
    }, [year, month, viewType]);

    return (
        <div className="revenue-summary">
            <h2>Chi tiết doanh thu</h2>

            {/* Dropdown cho năm và tháng */}
            <div>
                <select onChange={(e) => setYear(e.target.value)} value={year}>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    {/* Thêm các năm khác nếu cần */}
                </select>

                <select onChange={(e) => setMonth(e.target.value)} value={month}>
                    <option value="1">Tháng 1</option>
                    <option value="2">Tháng 2</option>
                    <option value="3">Tháng 3</option>
                    <option value="4">Tháng 4</option>
                    <option value="5">Tháng 5</option>
                    <option value="6">Tháng 6</option>
                    <option value="7">Tháng 7</option>
                    <option value="8">Tháng 8</option>
                    <option value="9">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                </select>
            </div>

            {/* Dropdown chọn kiểu xem doanh thu */}
            <div>
                <select onChange={(e) => setViewType(e.target.value)} value={viewType}>
                    <option value="table">Doanh thu theo bàn</option>
                    <option value="food">Doanh thu theo món</option>
                </select>
            </div>

            {/* Doanh thu theo món ăn */}
            {viewType === 'food' && (
                <div>
                    <h3>Doanh thu theo món ăn ({month}/{year})</h3>
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên món ăn</th>
                                    <th>số lượng bán</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueByFood.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="no-revenue">Không có doanh thu cho món ăn này</td>
                                    </tr>
                                ) : (
                                    revenueByFood.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.food_name}</td>
                                            <td>{item.total_sold}</td>
                                            <td className="revenue-cell">{item.total_revenue.toFixed(2)} VNĐ</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Doanh thu theo bàn */}
            {viewType === 'table' && (
                <div>
                    <h3>Doanh thu theo bàn ({month}/{year})</h3>
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên bàn</th>
                                    <th>số lượng đặt</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueByTable.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="no-revenue">Không có doanh thu cho bàn này</td>
                                    </tr>
                                ) : (
                                    revenueByTable.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.table_name}</td>
                                            <td>{item.total_orders}</td>
                                            <td className="revenue-cell">{item.total_revenue.toFixed(2)} VNĐ</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default RevenueSummary;
