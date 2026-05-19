import React from 'react';

const ExerciseCard = ({ exercise, index }) => {
  return (
    <div className="exercise-card">
      <div className="exercise-header">
        <span className="exercise-number">{index + 1}</span>
        <h3 className="exercise-name">{exercise.name}</h3>
      </div>
      
      <div className="exercise-details">
        <div className="detail-item">
          <span className="detail-label">Sets:</span>
          <span className="detail-value">{exercise.sets}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Reps:</span>
          <span className="detail-value">{exercise.reps}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Rest:</span>
          <span className="detail-value">{exercise.restSeconds}s</span>
        </div>
      </div>

      {exercise.equipment && exercise.equipment !== 'none' && (
        <div className="exercise-equipment">
          <span className="equipment-icon">🏋️</span>
          <span className="equipment-text">{exercise.equipment}</span>
        </div>
      )}

      <p className="exercise-description">{exercise.description}</p>

      {exercise.focusAreas && exercise.focusAreas.length > 0 && (
        <div className="exercise-tags">
          {exercise.focusAreas.map((area, idx) => (
            <span key={idx} className="tag">
              {area}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;

// Made with Bob
