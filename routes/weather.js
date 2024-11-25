const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Route to get weather data
router.get('/weather', weatherController.getWeather);

module.exports = router;
