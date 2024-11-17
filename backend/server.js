const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tableListRoutes = require('./routes/tableListRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderFoodRoutes = require('./routes/orderFoodRoutes');
const orderSummaryRoutes = require('./routes/orderSummaryRoutes');



const app = express();
const port = 3001; // Bạn có thể chọn cổng khác nếu cần

// Cấu hình middleware
app.use(cors());
app.use(bodyParser.json());

// Sử dụng routes
app.use('/api/tables', tableListRoutes); // Route cho bàn
app.use('/api/menus', menuRoutes);       // Route cho menu
app.use('/api/orders', orderRoutes);
app.use('/api/order_food', orderFoodRoutes);
app.use('/api/orderSummary', orderSummaryRoutes);




// Khởi động server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




