// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // POST /login
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';

//   db.query(sql, [email, password], (err, results) => {
//     if (err) {
//       console.error('❌ DB Error:', err.message);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (results.length > 0) {
//       return res.status(200).json({ message: 'Login successful', user: results[0] });
//     } else {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//   });
// });

// module.exports = router;

// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // POST /login
// router.post('/Login', (req, res) => {
//   const { username, password, role } = req.body;

//   const sql =
//     "SELECT * FROM user WHERE username = ? AND password = ? AND role = ?";

//   db.query(sql, [username, password, role], (err, results) => {
//     if (err) {
//       console.error('❌ DB Error:', err.message);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (results.length > 0) {
//       return res.status(200).json({ message: 'Login successful', user: results[0] });
//     } else {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//   });
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // POST /login
// router.post('/login', (req, res) => {
//   const { username, password, role } = req.body;

//   const sql =
//     "SELECT * FROM users WHERE username = ? AND password = ? AND role = ?"; // Changed 'user' to 'users'

//   db.query(sql, [username, password, role], (err, results) => {
//     if (err) {
//       console.error('❌ DB Error:', err.message);
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (results.length > 0) {
//       return res.status(200).json({ message: 'Login successful', user: results[0] });
//     } else {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }
//   });
// });

// module.exports = router;

// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM user WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('❌ DB Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

module.exports = router;