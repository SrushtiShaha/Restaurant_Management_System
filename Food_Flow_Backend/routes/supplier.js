const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Supplier
router.post('/add', (req, res) => {
  const { suppId, name, phone, address, productProvides } = req.body;
  const sql = `
    INSERT INTO supplier (suppId, name, phone, address, productProvides)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [suppId, name, phone, address, productProvides], (err) => {
    if (err) return res.status(500).json({ error: 'Add failed' });
    res.status(201).json({ message: 'Supplier added successfully' });
  });
});

// Update Supplier
router.put('/update/:suppId', (req, res) => {
  const { suppId } = req.params;
  const { name, phone, address, productProvides } = req.body;
  const sql = `
    UPDATE supplier
    SET name = ?, phone = ?, address = ?, productProvides = ?
    WHERE suppId = ?
  `;
  db.query(sql, [name, phone, address, productProvides, suppId], (err) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Supplier updated successfully' });
  });
});

// Delete Supplier
router.delete('/delete/:suppId', (req, res) => {
  const { suppId } = req.params;
  db.query('DELETE FROM supplier WHERE suppId = ?', [suppId], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Supplier deleted successfully' });
  });
});

// Search Supplier
router.get('/search/:suppId', (req, res) => {
  const { suppId } = req.params;
  db.query('SELECT * FROM supplier WHERE suppId = ?', [suppId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    if (results.length === 0) return res.status(404).json({ error: 'Supplier not found' });
    res.json(results[0]);
  });
});

// 📊 Summary Report: Total suppliers and distinct products
router.get('/reports/summary', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalSuppliers,
      COUNT(DISTINCT productProvides) AS totalProducts
    FROM supplier;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get summary' });
    res.json(results[0]);
  });
});

// 📋 List All Suppliers
router.get('/reports/list', (req, res) => {
  db.query('SELECT * FROM supplier', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get supplier list' });
    res.json(results);
  });
});

// 📦 Products Provided by Each Supplier
router.get('/reports/products', (req, res) => {
  const sql = `
    SELECT 
      suppId,
      COUNT(*) AS productCount,
      GROUP_CONCAT(DISTINCT productProvides) AS productNames
    FROM supplier
    GROUP BY suppId;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get products report' });
    const formatted = results.map(row => ({
      ...row,
      productNames: row.productNames ? row.productNames.split(',') : []
    }));
    res.json(formatted);
  });
});

module.exports = router;
