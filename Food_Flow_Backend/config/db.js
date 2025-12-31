// // const mongoose = require("mongoose");
// // require("dotenv").config();

// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect(process.env.MONGO_URI);
// //     console.log("✅ MongoDB Connected Successfully");
// //   } catch (err) {
// //     console.error("❌ MongoDB Connection Failed:", err);
// //     process.exit(1);
// //   }
// // };

// // module.exports = connectDB;

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     // Create a connection pool
//     const pool = mysql.createPool({
//       host: process.env.DB_HOST || 'localhost',
//       user: process.env.DB_USER || 'root',
//       password: process.env.DB_PASSWORD || '',
//       database: process.env.DB_NAME || 'restaurantmanagement',
//       port: process.env.DB_PORT || 3306,
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });

//     // Test the connection
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Connected Successfully');
//     connection.release(); // Release the connection back to the pool

//     // Export the pool for use in other parts of the app
//     module.exports.pool = pool;
//   } catch (err) {
//     console.error('❌ MySQL Connection Failed:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // ✅ Replace with your MySQL username
  password: '',              // ✅ Your MySQL password
  database: 'restaurant_management'  , // ✅ Replace with your DB name
  port: 3306, 
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL DB');
});

module.exports = connection;
