const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController'); // Ensure the path is correct

// Route to get all market prices
router.get('/market', marketController.getMarketPrices);

// Route to get market prices by category
router.get('/market/:category', marketController.getMarketPricesByCategory);

module.exports = router;
