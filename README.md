Aguka - Agricultural Empowerment Platform
Aguka is a web application designed to empower farmers by providing tools and resources to enhance productivity, financial planning, and community collaboration. This project is built using Node.js for the backend and HTML/CSS/JavaScript for the frontend.

Table of Contents
Features
Tech Stack
Prerequisites
Installation
Backend Setup
Frontend Setup
Usage
Troubleshooting

Features
Market Prices: View real-time crop prices by category.
Weather Updates: Access accurate weather forecasts for planning.
Financial Tools: Track costs, revenues, and profits for crops.
Crop Management: Search for best practices for specific crops.
Community Forum: Collaborate with other farmers through discussions.

Tech Stack
Backend: Node.js, Express.js, PostgreSQL
Frontend: HTML, CSS, JavaScript
APIs: OpenWeatherMap (for weather updates)
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v16 )
PostgreSQL
Git
A code editor / VS Code
Installation
Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/Aguka.git
cd Aguka2.0
Backend Setup
Navigate to the Backend Directory

bash
Copy code
cd backend
Install Dependencies Run the following command to install all required Node.js modules:

bash
Copy code
npm install
Set Up Environment Variables Create a .env file in the backend folder with the following variables:

env
Copy code
PORT=3001
DATABASE_URL=postgres://<username>:<password>@localhost:5432/agukadata
WEATHER_API_KEY=<your_weather_api_key>
JWT_SECRET=<your_jwt_secret>
Replace <username> and <password> with your PostgreSQL credentials.
Replace <your_weather_api_key> with your API key from OpenWeatherMap.
Replace <your_jwt_secret> with a random secure string.
Set Up the Database Log in to PostgreSQL and create the required database and tables:

sql
Copy code
CREATE DATABASE agukadata;

-- Example table for market prices
CREATE TABLE market_prices (
    id SERIAL PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    previous_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add more tables as necessary based on the features
Start the Backend Server Run the following command to start the server:

bash
Copy code
node app.js
The backend server should now be running on http://localhost:3001.
Frontend Setup
Navigate to the Frontend Directory

bash
Copy code
cd ../frontend
Update Fetch URLs In your frontend .js files, update all fetch calls to point to your live backend URL (or http://localhost:3001 for local testing):

javascript
Copy code
fetch('http://localhost:3001/api/market-prices')
Open HTML Files Open the HTML files in a browser to test the application:

index.html: Homepage
market-prices.html: Market Prices feature
weather.html: Weather Updates feature
And so on...
Usage
Run the Backend:

Ensure the backend server is running on http://localhost:3001.
Test Features:

Use the frontend HTML pages to interact with the application.
Optional:

Use Postman to test backend APIs directly.
Description of the homepage...

Market Prices
Description of market prices feature...

Troubleshooting
Common Issues
Backend Not Starting

Ensure all dependencies are installed with npm install.
Check your .env file for correct configuration.
Frontend Not Fetching Data

Verify the backend is running on the correct URL (http://localhost:3001 or live URL).
Check the browser console for errors.
Database Errors

Ensure PostgreSQL is running and the database is correctly set up.
