const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = connectDB;
