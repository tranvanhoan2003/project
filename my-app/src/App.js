import React, { useState } from 'react';
import './App.css';
import Order from './page/Order';
import Admin from './page/Admin';
// import DashboardCards from './admin/DashboardCards';

function App() {
  // Định nghĩa vai trò (có thể thay đổi theo dữ liệu đăng nhập, ví dụ từ API)
  const [role, setRole] = useState('order'); // mặc định là 'order', có thể thay đổi thành 'admin'

  return (
    <div className="app">
      {role === 'order' ? (
        <Order />
      ) : role === 'admin' ? (
        <Admin />
      ) : (
        <div>Vui lòng đăng nhập để truy cập nền tảng</div>
      )}
    </div>
  );
}

export default App;



// import React from 'react';
// import './App.css';
// import Order from './page/Order';
// import DashboardCards from './admin/DashboardCards';
// function App() {
//   return (
//     <div className="app">
//       <Order />
//     </div>
//   );
// }

// export default App;
