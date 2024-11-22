// import React, { useState } from "react";

// // Hàm để gọi API từ backend
// const fetchBillData = async (orderCode) => {
//   const response = await fetch(`http://localhost:3001/api/bill/${orderCode}`);
//   if (!response.ok) {
//     throw new Error('Hóa đơn không tồn tại');
//   }
//   return response.json();
// };

// const Bill = () => {
//   const [searchCode, setSearchCode] = useState(""); // Mã hóa đơn người dùng nhập
//   const [billData, setBillData] = useState(null); // Dữ liệu hóa đơn trả về
//   const [error, setError] = useState(null); // Lỗi nếu có

//   // Hàm xử lý khi người dùng thay đổi ô nhập mã hóa đơn
//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setSearchCode(value); // Cập nhật mã hóa đơn đã nhập

//     // Kiểm tra mã hóa đơn trước khi gọi API
//     if (!value) {
//       setBillData(null);
//       setError(null);
//       return;
//     }

//     // Kiểm tra định dạng của orderCode (ví dụ kiểm tra độ dài, hoặc kiểu dữ liệu)
//     if (value.length !== 8) { // Giả sử mã hóa đơn phải có 8 ký tự
//       setError("Mã hóa đơn phải có 8 ký tự.");
//       setBillData(null);
//       return;
//     }

//     try {
//       // Gọi API để lấy dữ liệu hóa đơn
//       const data = await fetchBillData(value);
//       setBillData(data);
//       setError(null); // Reset lỗi nếu tìm thấy dữ liệu
//     } catch (err) {
//       setBillData(null);
//       setError(err.message); // Hiển thị lỗi nếu không tìm thấy hóa đơn
//     }
//   };

//   // Tính tổng tiền của hóa đơn
//   const calculateTotal = () => {
//     if (!billData) return 0;
//     return billData.items.reduce(
//       (total, item) => {
//         const quantity = item.quantity || 0; // Kiểm tra giá trị quantity
//         const unitPrice = item.unitPrice || 0; // Kiểm tra giá trị unitPrice
//         return total + quantity * unitPrice;
//       },
//       0
//     );
//   };

//   return (
//     <div>
//       <h2>Tìm kiếm hóa đơn</h2>
//       <input
//         type="text"
//         placeholder="Nhập mã hóa đơn"
//         value={searchCode}
//         onChange={handleInputChange}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
//       {billData && (
//         <div>
//           <h3>Thông tin hóa đơn</h3>
//           <p><strong>Mã hóa đơn:</strong> {billData.orderCode}</p>
//           <p><strong>Tên bàn:</strong> {billData.tableName}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>Món</th>
//                 <th>Số lượng</th>
//                 <th>Đơn giá</th>
//                 <th>Thành tiền</th>
//               </tr>
//             </thead>
//             <tbody>
//               {billData.items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.foodName}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.unitPrice ? item.unitPrice.toLocaleString() : "N/A"} VND</td>
//                   <td>{(item.quantity * item.unitPrice || 0).toLocaleString()} VND</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <h4>Tổng tiền: {calculateTotal().toLocaleString()} VND</h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bill;




import React, { useState } from "react";
import './Bill.css';  // Import file CSS

// Hàm để gọi API từ backend
const fetchBillData = async (orderCode) => {
  const response = await fetch(`http://localhost:3001/api/bill/${orderCode}`);
  if (!response.ok) {
    throw new Error('Hóa đơn không tồn tại');
  }
  return response.json();
};

const Bill = () => {
  const [searchCode, setSearchCode] = useState(""); // Mã hóa đơn người dùng nhập
  const [billData, setBillData] = useState(null); // Dữ liệu hóa đơn trả về
  const [error, setError] = useState(null); // Lỗi nếu có

  // Hàm xử lý khi người dùng thay đổi ô nhập mã hóa đơn
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchCode(value); // Cập nhật mã hóa đơn đã nhập

    // Kiểm tra mã hóa đơn trước khi gọi API
    if (!value) {
      setBillData(null);
      setError(null);
      return;
    }

    // Kiểm tra định dạng của orderCode (ví dụ kiểm tra độ dài, hoặc kiểu dữ liệu)
    if (value.length !== 8) { // Giả sử mã hóa đơn phải có 8 ký tự
      setError("Mã hóa đơn phải có 8 ký tự.");
      setBillData(null);
      return;
    }

    try {
      // Gọi API để lấy dữ liệu hóa đơn
      const data = await fetchBillData(value);
      setBillData(data);
      setError(null); // Reset lỗi nếu tìm thấy dữ liệu
    } catch (err) {
      setBillData(null);
      setError(err.message); // Hiển thị lỗi nếu không tìm thấy hóa đơn
    }
  };

  // Tính tổng tiền của hóa đơn
  const calculateTotal = () => {
    if (!billData) return 0;
    return billData.items.reduce(
      (total, item) => {
        const quantity = item.quantity || 0; // Kiểm tra giá trị quantity
        const unitPrice = item.unitPrice || 0; // Kiểm tra giá trị unitPrice
        return total + quantity * unitPrice;
      },
      0
    );
  };

  return (
    <div className="bill-container"> {/* Thêm class vào div container */}
      <h2>Tìm kiếm hóa đơn</h2>
      <input
        type="text"
        placeholder="Nhập mã hóa đơn"
        value={searchCode}
        onChange={handleInputChange}
      />
      {error && <p className="error">{error}</p>} {/* Áp dụng class error */}
      {billData && (
        <div>
          <h3>Thông tin hóa đơn</h3>
          <p><strong>Mã hóa đơn:</strong> {billData.orderCode}</p>
          <p><strong>Tên bàn:</strong> {billData.tableName}</p>
          <table>
            <thead>
              <tr>
                <th>Món</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {billData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.foodName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice ? item.unitPrice.toLocaleString() : "N/A"} VND</td>
                  <td>{(item.quantity * item.unitPrice || 0).toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="total">Tổng tiền: {calculateTotal().toLocaleString()} VND</h4> {/* Áp dụng class total */}
        </div>
      )}
    </div>
  );
};

export default Bill;
