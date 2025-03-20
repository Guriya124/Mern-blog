import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './router/authRoute.js';

dotenv.config();

const app = express();

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURL, {
            serverSelectionTimeoutMS: 30000, // Timeout after 30s
        });
        console.log('Successfully connected to MongoDB!');
    } catch (err) {
        console.log('Failed to connect to MongoDB!', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

// Call the function to connect to DB
connectToDatabase();



app.use(express.json());
app.use(cors());




app.use('/api/auth', authRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 !!');
});