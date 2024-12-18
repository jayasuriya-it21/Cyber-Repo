// backend/server.js (Unified Version)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/db'); // MongoDB connection logic
const topicsRoute = require('./routes/topics');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const basicQuizRoute = require('./routes/basicQuiz');
const intermediateQuizRoute = require('./routes/intermediateQuiz');
const advancedQuizRoute = require('./routes/advancedQuiz');
const quizResultRoute = require('./routes/quizResult');

const app = express();

// Establish MongoDB connection
connectDB();

// Set up CORS to allow requests from two origins
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Allow specified HTTP methods
  credentials: true,       // Allow credentials (cookies, sessions, etc.)
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/topics', topicsRoute);                  // Topics route
app.use('/api/users', userRoutes);                    // User-related routes
app.use('/api/auth', authRoutes);                     // Authentication routes
app.use('/api/basicQuiz', basicQuizRoute);            // Basic Quiz route
app.use('/api/intermediateQuiz', intermediateQuizRoute); // Intermediate Quiz route
app.use('/api/advancedQuiz', advancedQuizRoute);      // Advanced Quiz route
app.use('/api/quizResults', quizResultRoute);         // Quiz results route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
