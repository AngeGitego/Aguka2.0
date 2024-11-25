const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Signup
exports.signup = async (req, res) => {
  const { name, phone_number, password } = req.body;

  if (!name || !phone_number || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE phone_number = $1', [phone_number]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists. Please log in.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const newUser = await pool.query(
      'INSERT INTO users (name, phone_number, password) VALUES ($1, $2, $3) RETURNING *',
      [name, phone_number, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Login
exports.login = async (req, res) => {
  const { phone_number, password } = req.body;

  if (!phone_number || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE phone_number = $1', [phone_number]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found. Please sign up.' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.rows[0].id, name: user.rows[0].name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token, user: { id: user.rows[0].id, name: user.rows[0].name } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


