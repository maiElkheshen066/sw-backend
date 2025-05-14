/**
 * @description: Database connection configuration
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = process.env.MONGO_URI; // Ensure this environment variable is set in your .env file

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 20, // use maxPoolSize instead of deprecated poolSize
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;