const pool = require('../config/db'); // Import database connection

exports.getCropDetails = async (req, res) => {
  const { crop } = req.params;

  console.log(`Received crop name: ${crop}`); // Debugging

  try {
    const query = 'SELECT practices FROM crops WHERE crop_name ILIKE $1';
    const result = await pool.query(query, [crop]);

    console.log(`Query Result:`, result.rows); // Debugging

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Crop not found.' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching crop details:', error);
    res.status(500).json({ error: 'Failed to fetch crop details' });
  }
};
