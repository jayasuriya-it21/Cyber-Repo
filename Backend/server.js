// backend/Server.js 

const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/db');
const topicsRoute = require('./routes/topics');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/topics', topicsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
