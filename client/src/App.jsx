import React, { useState, useCallback, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import { getWorkoutRecommendation } from './services/api';
import './App.css';

function App() {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    timeMinutes: 45,
    focusArea: 'abs',
    energyLevel: 'medium'
  });
  
  // Theme and layout state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  // Fetch workout recommendation
  const fetchWorkout = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getWorkoutRecommendation(
        params.timeMinutes,
        params.focusArea,
        params.energyLevel
      );
      
      if (response.success && response.workout) {
        setWorkout(response.workout);
      } else {
        setError('Failed to generate workout. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching workout:', err);
      setError(err.response?.data?.message || 'Failed to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle input changes - store inputs but don't auto-fetch
  const handleInputChange = useCallback((newInputs) => {
    setInputs(newInputs);
  }, []);

  // Manual refresh function
  const handleRefresh = useCallback(() => {
    fetchWorkout(inputs);
  }, [inputs, fetchWorkout]);

  // Initial load
  useEffect(() => {
    fetchWorkout(inputs);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isMobileLayout ? 'mobile-layout' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-top">
            <div className="header-title-section">
              <div className="header-emoji">🏋️</div>
              <div className="header-text">
                <h1>Workout Recommendation Service</h1>
                <p className="header-subtitle">Get a personalized workout plan tailored to your needs</p>
              </div>
            </div>
            <div className="header-controls">
              <button
                className="toggle-button"
                onClick={() => setIsMobileLayout(!isMobileLayout)}
                title={isMobileLayout ? "Switch to Desktop Layout" : "Switch to Mobile Layout"}
              >
                {isMobileLayout ? '💻 Desktop' : '📱 Mobile'}
              </button>
              <button
                className="toggle-button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="content-grid">
            <aside className="sidebar">
              <div className="form-container">
                <h2 className="form-title">Your Preferences</h2>
                <WorkoutForm onInputChange={handleInputChange} />
                <button
                  className="refresh-button"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? '⏳ Generating...' : '🔄 Generate Workout'}
                </button>
              </div>
            </aside>

            <section className="main-content">
              <WorkoutDisplay
                workout={workout}
                loading={loading}
                error={error}
              />
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© BluMorpho 2026 | Ty Fletcher</p>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
