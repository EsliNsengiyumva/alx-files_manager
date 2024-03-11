const express = require('express');
const routes = require('./routes/index');

const app = express();

// Set the port to environment variable PORT, or default to 5000
const PORT = process.env.PORT || 5000;

// Load all routes from routes/index.js
app.use(routes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
