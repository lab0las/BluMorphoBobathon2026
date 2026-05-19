import React from 'react';
import ExerciseCard from './ExerciseCard';

const WorkoutDisplay = ({ workout, loading, error }) => {
  if (loading) {
    return (
      <div className="workout-display loading">
        <div className="spinner"></div>
        <p>Generating your personalized workout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workout-display error">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="workout-display empty">
        <div className="empty-icon">🏋️‍♀️</div>
        <h3>Ready to Get Started?</h3>
        <p>Adjust your preferences above to generate a personalized workout plan.</p>
      </div>
    );
  }

  return (
    <div className="workout-display">
      <div className="workout-summary">
        <h2>Your Personalized Workout</h2>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <div className="stat-content">
              <span className="stat-value">{workout.totalTime}</span>
              <span className="stat-label">minutes</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💪</span>
            <div className="stat-content">
              <span className="stat-value">{workout.exerciseCount}</span>
              <span className="stat-label">exercises</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <div className="stat-content">
              <span className="stat-value">{workout.estimatedCalories}</span>
              <span className="stat-label">calories</span>
            </div>
          </div>
        </div>
      </div>

      <div className="exercises-container">
        <h3 className="exercises-title">Exercises</h3>
        <div className="exercises-grid">
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} index={index} />
          ))}
        </div>
      </div>

      <div className="workout-tips">
        <h4>💡 Workout Tips</h4>
        <ul>
          <li>Warm up for 5-10 minutes before starting</li>
          <li>Focus on proper form over speed</li>
          <li>Stay hydrated throughout your workout</li>
          <li>Cool down and stretch after completing all exercises</li>
          <li>Listen to your body and rest when needed</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkoutDisplay;

// Made with Bob
