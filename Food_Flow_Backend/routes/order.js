const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Order
router.post('/addord', (req, res) => {
  const { id, productId, supplierId, orderQuantity, orderDate, deliveryDate, orderCost, amountToPay, status } = req.body;
  const sql = 'INSERT INTO orders(orderId, proId, suppId, quantity, orderDate, deliveryDate, orderCost, totalAmount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [id, productId, supplierId, orderQuantity, orderDate, deliveryDate, orderCost, amountToPay, status], (err) => {
    if (err) return res.status(500).json({ error: 'Add failed' });
    res.status(201).json({ message: 'Order added successfully' });
  });
});

// Update Order
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { productId, supplierId, orderQuantity, orderDate, deliveryDate, orderCost, amountToPay, status } = req.body;
  const sql = 'UPDATE orders SET proId=?, suppId=?, quantity=?, orderDate=?, deliveryDate=?, orderCost=?, totalAmount=?, status=? WHERE orderId=?';
  db.query(sql, [productId, supplierId, orderQuantity, orderDate, deliveryDate, orderCost, amountToPay, status, id], (err) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Order updated successfully' });
  });
});

// Delete Order
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orders WHERE orderId = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Order deleted successfully' });
  });
});

// Search Order
router.get('/search/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orders WHERE orderId = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    if (results.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(results[0]);
  });
});
// Summary Report: Total orders and total quantity
router.get('/reports/summary', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalOrders,
      IFNULL(SUM(quantity), 0) AS totalQuantity
    FROM orders;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get summary' });
    res.json(results[0]);
  });
});

// Report by Supplier
router.get('/reports/by-supplier', (req, res) => {
  const sql = `
    SELECT suppId AS supplierId, COUNT(*) AS count, SUM(quantity) AS totalQuantity
    FROM orders
    GROUP BY suppId;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get supplier report' });
    res.json(results);
  });
});

// Report by Product
router.get('/reports/by-product', (req, res) => {
  const sql = `
    SELECT proId AS productId, COUNT(*) AS count, SUM(quantity) AS totalQuantity
    FROM orders
    GROUP BY proId;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get product report' });
    res.json(results);
  });
});

// Report by Status
router.get('/reports/by-status', (req, res) => {
  const sql = `
    SELECT status, COUNT(*) AS count
    FROM orders
    GROUP BY status;
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get status report' });
    res.json(results);
  });
});

module.exports = router;
