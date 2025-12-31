// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const menuRoutes = require("./routes/menu");
const customerRoutes = require("./routes/customer");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const donationRoutes = require("./routes/donation");
const revenueRoute = require("./routes/revenue");
const supplierRoute = require("./routes/supplier");
const menuitems = require("./routes/menuitems");

const app = express();
const PORT = 3002;

app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use('/', authRoutes);
app.use('/menu', menuRoutes);
app.use('/customer', customerRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/donation", donationRoutes);
app.use("/revenue", revenueRoute);
app.use("/supplier", supplierRoute);
app.use("/menuitems", menuitems);

// app.use('/', menuRoutes); 


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
