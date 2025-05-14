const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users.routes');

const rateLimit = require('express-rate-limit');
const app = express();

require('dotenv').config();
connectDB();
app.use(cors());
app.use(express.json());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased from 100
  message: "Too many requests, try again later",
  skip: (req) => req.ip === "127.0.0.1", // Allow local testing
});
app.use("/api/auth", limiter);

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;