import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
dotenv.config();
// Initialize express app

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/quiz',questionRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App Backend!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});