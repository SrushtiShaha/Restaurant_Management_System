// const express = require('express');
// const router = express.Router();
// const Contact = require('../models/Contact'); // Mongoose model

// router.post('/', async (req, res) => {
//   const { name, email, message } = req.body;
//   try {
//     const newContact = new Contact({ name, email, message });
//     await newContact.save();
//     res.json({ success: true, message: 'Message sent successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error sending message' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Access the pool from connectDB
    const pool = require('../db').pool;

    // Insert into the contacts table
    await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

module.exports = router;
