const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const tableListRoutes = require('./routes/tableListRoutes');
const tableListRoutes = require('./routes/order/tableListRoutes');
// const menuRoutes = require('./routes/menuRoutes');
const menuRoutes = require('./routes/order/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');
const orderRoutes = require('./routes/order/orderRoutes');
// const orderFoodRoutes = require('./routes/orderFoodRoutes');
const orderFoodRoutes = require('./routes/order/orderFoodRoutes');
// const orderSummaryRoutes = require('./routes/orderSummaryRoutes');
const orderSummaryRoutes = require('./routes/order/orderSummaryRoutes');

const categoryRoutes = require("./routes/admin/categoryRoutes"); // Đường dẫn tới file route
const foodRoutes = require("./routes/admin/foodRoutes");
const tableRoutes = require('./routes/admin/tableRoutes');
const revenueRoutes = require('./routes/admin/revenueRoutes');
const employeeRoutes = require('./routes/admin/employeeRoutes');
const billRoutes = require('./routes/admin/billRoutes');





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

app.use("/api/categories", categoryRoutes);
app.use("/api/foods", foodRoutes);
app.use('/api/tables', tableRoutes);
app.use("/api/revenue", revenueRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api', billRoutes);



// Khởi động server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




