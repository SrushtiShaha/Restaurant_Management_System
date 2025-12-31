// revenueRoute.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // your database connection

// Total revenue and total customers
router.get('/report', (req, res) => {
  const sql = 'SELECT SUM(totalBill) AS totalRevenue, COUNT(*) AS totalSales FROM customer';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch customers' });
    res.json(results[0]); // <-- FIXED
  });
});
// revenueRoute.js
router.get('/daily', async (req, res) => {
  const sql = 'SELECT DATE(visitedDate) AS date, COUNT(*) AS customerCount, SUM(totalBill) AS totalBill FROM customer GROUP BY DATE(visitedDate) ORDER BY DATE(visitedDate) DESC LIMIT 30 ';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

module.exports = router;