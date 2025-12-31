const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /product/add
router.post('/add', (req, res) => {
  const { id, name, currentStock, unit, reorder, supplierId, category } = req.body;

  if (!id || !name || !currentStock || !unit || !reorder || !supplierId || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO product (proId, proName, proPresentNo, unit, reorder, supplierId, category) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [id, name, currentStock, unit, reorder, supplierId, category], (err, result) => {
    if (err) {
      console.error('❌ Error inserting product:', err.message);
      return res.status(500).json({ error: 'Failed to add product' });
    }
    res.status(201).json({ message: '✅ Product added successfully!' });
  });
});
router.get('/search/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM product WHERE proId = ?';

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch product' });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });

    const row = results[0];
    res.json({
      id: row.proId,
      name: row.proName,
      currentStock: row.proPresentNo,
      unit: row.unit,
      reorder: row.reorder,
      supplierId: row.supplierId,
      category: row.category
    });
  });
});

// ✅ UPDATE Product
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, currentStock, unit, reorder, supplierId, category } = req.body;

  const sql = 'UPDATE product SET proName=?, proPresentNo=?, unit=?, reorder=?, supplierId=?, category=? WHERE proId=?';

  db.query(sql, [name, currentStock, unit, reorder, supplierId, category, id], (err) => {
    if (err) {
      console.error('❌ Update error:', err.message);
      return res.status(500).json({ error: 'Failed to update product' });
    }

    res.json({ message: '✅ Product updated successfully!' });
  });
});

// ✅ DELETE Product
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM product WHERE proId = ?', [id], (err) => {
    if (err) {
      console.error('❌ Delete error:', err.message);
      return res.status(500).json({ error: 'Failed to delete product' });
    }

    res.json({ message: '🗑️ Product deleted successfully!' });
  });
});
router.get('/getall', (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch customers' });
    res.json(results);
  });
});

module.exports = router;