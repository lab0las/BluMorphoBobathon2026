import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

/**
 * Get workout recommendation from the API
 * @param {number} timeMinutes - Workout duration in minutes
 * @param {string} focusArea - Target muscle group
 * @param {string} energyLevel - User's energy level
 * @returns {Promise} Workout recommendation
 */
export const getWorkoutRecommendation = async (timeMinutes, focusArea, energyLevel) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/workout/recommend`, {
      timeMinutes,
      focusArea,
      energyLevel
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching workout recommendation:', error);
    throw error;
  }
};

/**
 * Get available focus areas
 * @returns {Promise} List of focus areas
 */
export const getFocusAreas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/focus-areas`);
    return response.data.focusAreas;
  } catch (error) {
    console.error('Error fetching focus areas:', error);
    throw error;
  }
};

/**
 * Get available energy levels
 * @returns {Promise} List of energy levels
 */
export const getEnergyLevels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workout/energy-levels`);
    return response.data.energyLevels;
  } catch (error) {
    console.error('Error fetching energy levels:', error);
    throw error;
  }
};

// Made with Bob
