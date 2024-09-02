require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleauth'); 

const app = express();

// Connect to the database
connectDB();

app.use(cors({
  origin: 'https://chatopen.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// Add a route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Hello, JSON' });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/google', googleAuthRoutes);

// Use environment variable for port if available
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
