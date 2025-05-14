const app = require('./app'); // Import the Express app from app.js
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).setTimeout(120000);