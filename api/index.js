import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './router/userRouter.js';

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGODBURL).then(
    () => {
        console.log('Connected to MongoDB !!!');
    }
).catch((err) => {
    console.log('Failed to connect to MongoDB !!', err);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 !!');
});

app.use('/api/user', userRoutes);