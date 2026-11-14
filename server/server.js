const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { connectDB, getDBStatus } = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const admissionsRoutes = require('./routes/admissionsRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const parentRoutes = require('./routes/parentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow Next.js frontend dev & production
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/applications', admissionsRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/v1/parent', parentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Health check & System info
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'AthleteEd API - Sports Academy Academic Boarding School Platform',
    version: '1.0.0 (MVP)',
    databaseConnected: getDBStatus(),
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('AthleteEd REST API is active. Access endpoints via /api/v1/...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` AthleteEd Express Server running on port ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/v1/health`);
  console.log(`=================================================`);
});

module.exports = app;
