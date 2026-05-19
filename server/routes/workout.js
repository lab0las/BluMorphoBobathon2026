const express = require('express');
const router = express.Router();
const { generateWorkout } = require('../services/recommendationEngine');

/**
 * POST /api/workout/recommend
 * Generate a workout recommendation based on user inputs
 */
router.post('/recommend', (req, res) => {
  try {
    const { timeMinutes, focusArea, energyLevel } = req.body;
    
    // Validate required fields
    if (!timeMinutes || !focusArea || !energyLevel) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide timeMinutes, focusArea, and energyLevel'
      });
    }
    
    // Generate workout
    const workout = generateWorkout(
      parseInt(timeMinutes),
      focusArea,
      energyLevel
    );
    
    // Return workout plan
    res.json({
      success: true,
      workout: workout
    });
    
  } catch (error) {
    console.error('Error generating workout:', error);
    res.status(400).json({
      error: 'Failed to generate workout',
      message: error.message
    });
  }
});

/**
 * GET /api/workout/focus-areas
 * Get list of available focus areas
 */
router.get('/focus-areas', (req, res) => {
  res.json({
    focusAreas: [
      { value: 'abs', label: 'Abs & Core' },
      { value: 'arms', label: 'Arms' },
      { value: 'shoulders', label: 'Shoulders' },
      { value: 'legs', label: 'Legs' },
      { value: 'back', label: 'Back' },
      { value: 'chest', label: 'Chest' },
      { value: 'fullbody', label: 'Full Body' }
    ]
  });
});

/**
 * GET /api/workout/energy-levels
 * Get list of available energy levels
 */
router.get('/energy-levels', (req, res) => {
  res.json({
    energyLevels: [
      { value: 'low', label: 'Low Energy', description: 'Lighter workout, more rest' },
      { value: 'medium', label: 'Medium Energy', description: 'Balanced workout' },
      { value: 'high', label: 'High Energy', description: 'Intense workout, less rest' }
    ]
  });
});

module.exports = router;

// Made with Bob
