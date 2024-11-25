const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');
const cropRoutes = require('./routes/crops'); // Import the crops routes
const marketRoutes = require('./routes/market'); 
const weatherRoutes = require('./routes/weather'); // Import weather routes
const financialRoutes = require('./routes/financial');
const communityForumRoutes = require('./routes/communityForum'); // Import forum routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/crop-management', cropRoutes);
app.use('/crop-management', marketRoutes);
app.use('/api', weatherRoutes); // Weather updates available at /api/weather
app.use('/api', financialRoutes);
app.use('/api', communityForumRoutes);
// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/market', require('./routes/market'));
app.use('/weather', require('./routes/weather'));
app.use('/communityForum', require('./routes/communityForum'));
app.use('/crops', require('./routes/crops')); 
app.use('/financial', require('./routes/financial'));


// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


