const axios = require('axios');

// Fetch weather data for a given location
exports.getWeather = async (req, res) => {
  const { location } = req.query; // Location passed as a query parameter

  try {
    // Replace with your Weather API Key
    const API_KEY = process.env.WEATHER_API_KEY;
    const API_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`;

    const response = await axios.get(API_URL);

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error.info });
    }

    const weatherData = {
      location: response.data.location.name,
      temperature: response.data.current.temperature,
      condition: response.data.current.weather_descriptions[0],
      wind_speed: response.data.current.wind_speed,
      humidity: response.data.current.humidity,
      icon: response.data.current.weather_icons[0],
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather updates' });
  }
};
