const express = require('express');
const app = express();

// Middleware atau logika lainnya
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Express.js' });
});

// Ekspor handler
module.exports = app;