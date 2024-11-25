const { Client } = require('pg');
require('dotenv').config();

console.log("Starting database connection test...");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
console.log("Loaded environment variables:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

client.connect(err => {
  if (err) {
    console.error('Direct connection error:', err.message, '\nDetails:', err);
  } else {
    console.log('Direct database connection successful.');
    client.end();
  }
});

console.log("Database connection test code executed.");
