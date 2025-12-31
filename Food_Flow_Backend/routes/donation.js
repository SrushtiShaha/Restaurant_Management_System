const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/adddo', (req, res) => {
  const {
    id,
    foodDetails,
    quantity,
    donationPlace,
    donationAddress,
    donationDate,
    volunteerName,
    volunteerId,
    status,
    description
  } = req.body;

  if (!id || !foodDetails || !quantity || !donationPlace || !donationAddress || !donationDate || !volunteerName || !volunteerId || !status) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const sql = 'INSERT INTO donation (donId, foodDetails, quantity, donationPlace, donAddress, donDate, volunteerName, volId, status, description  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [
    id,
    foodDetails,
    quantity,
    donationPlace,
    donationAddress,
    donationDate,
    volunteerName,
    volunteerId,
    status,
    description
  ], (err, result) => {
    if (err) {
      console.error('❌ Error inserting donation:', err.message);
      return res.status(500).json({ error: 'Failed to submit donation' });
    }

    res.status(201).json({ message: 'Donation added successfully' });
  });
});

router.get('/all', (req, res) => {
  db.query('SELECT * FROM donation', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch donations' });
    res.json(results);
  });
});

// Update Route (add ":id" parameter)
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const {
    foodDetails, quantity, donationPlace, donationAddress,
    donationDate, volunteerName, volunteerId, status, description
  } = req.body;

  const sql = 'UPDATE donation SET foodDetails=?, quantity=?, donationPlace=?, donAddress=?, donDate=?, volunteerName=?, volId=?, status=?, description=? WHERE donId=?';

  db.query(sql, [
    foodDetails, quantity, donationPlace, donationAddress,
    donationDate, volunteerName, volunteerId, status, description, id
  ], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Donation updated successfully' });
  });
});

// Delete Route (add ":id" parameter)
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM donation WHERE donId = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Donation deleted successfully' });
  });
});

// Search donation by ID
router.get('/search/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM donation WHERE donId = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Search failed', details: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Donation not found' });
    res.json(results[0]);
  });
});
// 1. Total donations & quantity
router.get('/reports/summary', (req, res) => {
  const sql = 'SELECT COUNT(*) AS totalDonations, SUM(quantity) AS totalQuantity  FROM donation ';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Summary failed' });
    res.json(result[0]);
  });
});

// 2. Donations by volunteer
router.get('/reports/by-volunteer', (req, res) => {
  const sql = 'SELECT volunteerName, volId, COUNT(*) AS count, SUM(quantity) AS totalQuantity FROM donation GROUP BY volId';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Volunteer report failed' });
    res.json(results);
  });
});

// 3. Donations by place
router.get('/reports/by-place', (req, res) => {
  const sql = 'SELECT donationPlace, COUNT(*) AS count FROM donation GROUP BY donationPlace';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Place report failed' });
    res.json(results);
  });
});

// 4. Donations by status
router.get('/reports/by-status', (req, res) => {
  const sql = ' SELECT status, COUNT(*) AS count FROM donation GROUP BY status';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Status report failed' });
    res.json(results);
  });
});


module.exports = router;