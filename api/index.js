import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './router/userRoute.js';
import authRoutes from './router/authRoute.js';

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGODBURL).then(
    () => {
        console.log('Connected to MongoDB !!!');
    }
).catch((err) => {
    console.log('Failed to connect to MongoDB !!', err);
});

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 !!');
});

app.use('/api/user', userRoutes);
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