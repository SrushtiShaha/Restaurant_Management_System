const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🔹 Add Menu Item
router.post('/add', (req, res) => {
  const { menuId, name, description, price, category, imageurl } = req.body;
  const sql = `
    INSERT INTO menuitems (menuId, name, description, price, category, imageurl)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [menuId, name, description, price, category, imageurl], (err) => {
    if (err) return res.status(500).json({ error: 'Add failed' });
    res.status(201).json({ message: 'Menu item added successfully' });
  });
});

// 🔹 Update Menu Item
router.put('/update/:menuId', (req, res) => {
  const { menuId } = req.params;
  const { name, description, price, category, imageurl } = req.body;
  const sql = `
    UPDATE menuitems 
    SET name=?, description=?, price=?, category=?, imageurl=? 
    WHERE menuId=?
  `;
  db.query(sql, [name, description, price, category, imageurl, menuId], (err) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Menu item updated successfully' });
  });
});

// 🔹 Delete Menu Item
router.delete('/delete/:menuId', (req, res) => {
  const { menuId } = req.params;
  db.query('DELETE FROM menuitems WHERE menuId = ?', [menuId], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Menu item deleted successfully' });
  });
});

// 🔹 Search/Get Menu Item by ID
router.get('/search/:menuId', (req, res) => {
  const { menuId } = req.params;
  db.query('SELECT * FROM menuitems WHERE menuId = ?', [menuId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    if (results.length === 0) return res.status(404).json({ error: 'Menu item not found' });
    res.json(results[0]);
  });
});

// 🔹 Get All Menu Items
router.get('/all', (req, res) => {
  db.query('SELECT * FROM menuitems', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch menu items' });
    res.json(results);
  });
});

// 🔹 Summary Report
router.get('/reports/summary', (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS totalItems,
      IFNULL(SUM(price), 0) AS totalValue
    FROM menuitems;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get summary' });
    res.json(results[0]);
  });
});

// 🔹 Report by Category
router.get('/reports/by-category', (req, res) => {
  const sql = `
    SELECT category, COUNT(*) AS itemCount, SUM(price) AS totalValue
    FROM menuitems
    GROUP BY category;
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get category report' });
    res.json(results);
  });
});

module.exports = router;
