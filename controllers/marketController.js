const pool = require('../config/db');

// Fetch all market prices
exports.getMarketPrices = async (req, res) => {
  try {
    const query = `
      SELECT crop_name, category, current_price, previous_price, created_at
      FROM market_prices
      ORDER BY category, crop_name
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No market prices found.' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ error: 'Failed to fetch market prices.' });
  }
};

// Fetch market prices by category
exports.getMarketPricesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query = `
      SELECT crop_name, current_price, previous_price, created_at
      FROM market_prices
      WHERE category ILIKE $1
      ORDER BY crop_name
    `;
    const result = await pool.query(query, [category]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No market prices found for this category.' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching market prices:', error);
    res.status(500).json({ error: 'Failed to fetch market prices.' });
  }
};
