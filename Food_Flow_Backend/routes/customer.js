const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/addcust', (req, res) => {
  const {
    name,
    numberOfPeople,
    orderDetails,
    totalBill,
    userId,
    visitedDate,
    phoneNo,
    donationStatus,
    donatedFoodRemained,
    donationId
  } = req.body;

  const sql = 'INSERT INTO customer (name, noOfPeople, orderDetails, totalBill, userId, visitedDate, phone, donatedAnyFood, donationStatus,donationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [
    name,
    numberOfPeople,
    orderDetails,
    totalBill,
    userId,
    visitedDate,
    phoneNo,
    donationStatus,
    donatedFoodRemained,
    donationId
  ], (err, result) => {
    if (err) {
      console.error('❌ Error inserting customer:', err.message);
      return res.status(500).json({ error: 'Failed to add customer' });
    }

    res.status(201).json({ message: 'Customer added successfully' });
  });
});
router.get('/search/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM customer WHERE userId = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch customer' });
    if (results.length === 0) return res.status(404).json({ error: 'Customer not found' });

    const row = results[0];
    res.json({
      name: row.name,
      numberOfPeople: row.noOfPeople,
      orderDetails: row.orderDetails,
      totalBill: row.totalBill,
      userId: row.userId,
      visitedDate: row.visitedDate,
      phoneNo: row.phone,
      donationStatus: row.donationStatus,
      donatedFoodRemained: !!row.donatedAnyFood, // convert 1/0 to boolean
      donationId: row.donationId,
    });
  });
});

// UPDATE by userId
router.put('/update/:userId', (req, res) => {
  const { userId } = req.params;
  const {
    name,
    numberOfPeople,
    orderDetails,
    totalBill,
    visitedDate,
    phoneNo,
    donationStatus,
    donatedFoodRemained,
    donationId
  } = req.body;

  const sql = 'UPDATE customer SET name=?, noOfPeople=?, orderDetails=?, totalBill=?, visitedDate=?, phone=?, donationStatus=?, donatedAnyFood=?, donationId=? WHERE userId=?';

  db.query(sql, [
    name,
    numberOfPeople,
    orderDetails,
    totalBill,
    visitedDate,
    phoneNo,
    donationStatus,
    donatedFoodRemained ? 1 : 0,
    donationId,
    userId
  ], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update customer' });
    res.json({ message: 'Customer updated successfully' });
  });
});

// DELETE by userId
router.delete('/delete/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'DELETE FROM customer WHERE userId = ?';

  db.query(sql, [userId], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to delete customer' });
    res.json({ message: 'Customer deleted successfully' });
  });
});
router.get('/getall', (req, res) => {
  const sql = 'SELECT * FROM customer';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch customers' });
    res.json(results);
  });
});

module.exports = router;