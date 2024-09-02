require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleauth');

const app = express();

// Connect to the database
connectDB();

// CORS middleware
app.use(cors({
    origin: 'https://chatopen-jaxj.vercel.app', //  frontend origin
    credentials: true // Allow credentials
}));

// Middleware to ensure Access-Control-Allow-Credentials header is set
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Handle preflight requests
app.options('*', cors({
    origin: 'https://chatopen-jaxj.vercel.app', 
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => { 
    res.json({ message: 'Hello, JSON' });
});

app.get('/surya', (req, res) => { 
    res.json({ message: 'Hello, surya' });
});

// Mount routes
app.use('/auth', authRoutes);
app.use('/auth/google', googleAuthRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
