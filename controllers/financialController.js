const pool = require('../config/db');

// Add a financial record
exports.addRecord = async (req, res) => {
  const { farmer_name, crop_name, cost, revenue } = req.body;

  try {
    const query = `
      INSERT INTO financial_tools (farmer_name, crop_name, cost, revenue)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [farmer_name, crop_name, cost, revenue];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Financial record added successfully.', record: result.rows[0] });
  } catch (error) {
    console.error('Error adding financial record:', error);
    res.status(500).json({ error: 'Failed to add financial record.' });
  }
};

// Get all financial records
exports.getAllRecords = async (req, res) => {
  try {
    const query = 'SELECT * FROM financial_tools ORDER BY created_at DESC;';
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching financial records:', error);
    res.status(500).json({ error: 'Failed to fetch financial records.' });
  }
};
