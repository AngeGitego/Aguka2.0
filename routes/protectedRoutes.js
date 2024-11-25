const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

// Route accessible by farmers only
router.post('/forum', verifyToken, authorizeRole('farmer'), (req, res) => {
  res.json({ message: 'Access granted to post in the forum' });
});

// Route accessible by buyers only
router.get('/crops', verifyToken, authorizeRole('buyer'), (req, res) => {
  res.json({ message: 'Access granted to view crops' });
});

// Route accessible by admins only
router.post('/manage', verifyToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Access granted to manage platform data' });
});

module.exports = router;  // Export the router directly
