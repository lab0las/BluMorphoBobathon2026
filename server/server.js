const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const workoutRoutes = require('./routes/workout');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use('/api/workout', workoutRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Workout Recommendation API is running' });
});

// Serve static files from React build (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏋️  Workout Recommendation Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Frontend available at http://localhost:${PORT}`);
  }
});

module.exports = app;

// Made with Bob
