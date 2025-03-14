// app.js
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import logger from './middleware/logger.js';
import jobRouter from './routes/jobRoute.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

// Fix: Ensure the correct route prefix is used
app.use('/user', authRouter);
app.use('/api/jobs', jobRouter);

export default app;
