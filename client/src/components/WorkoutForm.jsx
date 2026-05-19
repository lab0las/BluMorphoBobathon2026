import React, { useState, useEffect } from 'react';
import { getFocusAreas, getEnergyLevels } from '../services/api';

const WorkoutForm = ({ onInputChange }) => {
  const [timeMinutes, setTimeMinutes] = useState(45);
  const [focusArea, setFocusArea] = useState('abs');
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [focusAreas, setFocusAreas] = useState([]);
  const [energyLevels, setEnergyLevels] = useState([]);

  // Load focus areas and energy levels on mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [areas, levels] = await Promise.all([
          getFocusAreas(),
          getEnergyLevels()
        ]);
        setFocusAreas(areas);
        setEnergyLevels(levels);
      } catch (error) {
        console.error('Error loading options:', error);
        // Set default values if API fails
        setFocusAreas([
          { value: 'abs', label: 'Abs & Core' },
          { value: 'arms', label: 'Arms' },
          { value: 'shoulders', label: 'Shoulders' },
          { value: 'legs', label: 'Legs' },
          { value: 'back', label: 'Back' },
          { value: 'chest', label: 'Chest' },
          { value: 'fullbody', label: 'Full Body' }
        ]);
        setEnergyLevels([
          { value: 'low', label: 'Low Energy' },
          { value: 'medium', label: 'Medium Energy' },
          { value: 'high', label: 'High Energy' }
        ]);
      }
    };
    loadOptions();
  }, []);

  // Notify parent component of changes
  useEffect(() => {
    onInputChange({ timeMinutes, focusArea, energyLevel });
  }, [timeMinutes, focusArea, energyLevel, onInputChange]);

  const handleTimeChange = (e) => {
    setTimeMinutes(parseInt(e.target.value));
  };

  const handleFocusAreaChange = (e) => {
    setFocusArea(e.target.value);
  };

  const handleEnergyLevelChange = (e) => {
    setEnergyLevel(e.target.value);
  };

  return (
    <div className="workout-form">
      <div className="form-section">
        <label htmlFor="time-slider">
          <span className="label-text">Workout Duration</span>
          <span className="label-value">{timeMinutes} minutes</span>
        </label>
        <input
          id="time-slider"
          type="range"
          min="15"
          max="90"
          step="5"
          value={timeMinutes}
          onChange={handleTimeChange}
          className="slider"
        />
        <div className="slider-labels">
          <span>15 min</span>
          <span>90 min</span>
        </div>
      </div>

      <div className="form-section">
        <label htmlFor="focus-area">
          <span className="label-text">Focus Area</span>
        </label>
        <select
          id="focus-area"
          value={focusArea}
          onChange={handleFocusAreaChange}
          className="select-input"
        >
          {focusAreas.map((area) => (
            <option key={area.value} value={area.value}>
              {area.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-section">
        <label className="label-text">Energy Level</label>
        <div className="energy-level-buttons">
          {energyLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              className={`energy-button ${energyLevel === level.value ? 'active' : ''}`}
              onClick={() => setEnergyLevel(level.value)}
            >
              <span className="energy-label">{level.label}</span>
              {level.description && (
                <span className="energy-description">{level.description}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;

// Made with Bob
