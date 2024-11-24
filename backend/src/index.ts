import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/banana-disease-detection', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
