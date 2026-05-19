const fs = require('fs');
const path = require('path');

// Load exercises database
const exercisesPath = path.join(__dirname, '../data/exercises.json');
const exercisesData = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

/**
 * Calculate workout recommendations based on user inputs
 * @param {number} timeMinutes - Total workout time in minutes
 * @param {string} focusArea - Target muscle group
 * @param {string} energyLevel - User's energy level (low, medium, high)
 * @returns {object} Workout plan with exercises
 */
function generateWorkout(timeMinutes, focusArea, energyLevel) {
  // Validate inputs
  if (!timeMinutes || timeMinutes < 15 || timeMinutes > 90) {
    throw new Error('Time must be between 15 and 90 minutes');
  }

  const validFocusAreas = ['abs', 'arms', 'shoulders', 'legs', 'back', 'chest', 'fullbody'];
  if (!validFocusAreas.includes(focusArea.toLowerCase())) {
    throw new Error('Invalid focus area');
  }

  const validEnergyLevels = ['low', 'medium', 'high'];
  if (!validEnergyLevels.includes(energyLevel.toLowerCase())) {
    throw new Error('Invalid energy level');
  }

  // Determine workout parameters based on time
  const workoutParams = calculateWorkoutParams(timeMinutes, energyLevel);
  
  // Filter exercises by focus area and energy level
  const suitableExercises = filterExercises(focusArea, energyLevel);
  
  // Select exercises for the workout
  const selectedExercises = selectExercises(
    suitableExercises,
    workoutParams.exerciseCount,
    focusArea
  );
  
  // Build workout plan with sets and reps
  const workout = buildWorkoutPlan(
    selectedExercises,
    workoutParams,
    energyLevel,
    timeMinutes
  );
  
  return workout;
}

/**
 * Calculate workout parameters based on time and energy level
 */
function calculateWorkoutParams(timeMinutes, energyLevel) {
  let exerciseCount, baseSets, restSeconds;
  
  // Determine exercise count and sets based on time
  if (timeMinutes <= 30) {
    exerciseCount = 5;
    baseSets = 2;
  } else if (timeMinutes <= 45) {
    exerciseCount = 6;
    baseSets = 3;
  } else if (timeMinutes <= 60) {
    exerciseCount = 7;
    baseSets = 3;
  } else {
    exerciseCount = 9;
    baseSets = 4;
  }
  
  // Adjust based on energy level
  switch (energyLevel.toLowerCase()) {
    case 'low':
      baseSets = Math.max(2, baseSets - 1);
      restSeconds = 90;
      break;
    case 'medium':
      restSeconds = 60;
      break;
    case 'high':
      baseSets = baseSets + 1;
      restSeconds = 45;
      break;
    default:
      restSeconds = 60;
  }
  
  return { exerciseCount, baseSets, restSeconds };
}

/**
 * Filter exercises by focus area and energy level
 */
function filterExercises(focusArea, energyLevel) {
  const allExercises = exercisesData.exercises;
  
  // Filter by focus area
  let filtered = allExercises.filter(exercise => {
    return exercise.focusAreas.includes(focusArea.toLowerCase()) ||
           (focusArea.toLowerCase() === 'fullbody' && exercise.focusAreas.includes('fullbody'));
  });
  
  // Adjust for energy level
  if (energyLevel.toLowerCase() === 'low') {
    // Prefer low to medium energy exercises
    filtered = filtered.filter(ex => 
      ex.energyRequirement === 'low' || ex.energyRequirement === 'medium'
    );
  } else if (energyLevel.toLowerCase() === 'high') {
    // Include all exercises, prefer high energy ones
    filtered = filtered.sort((a, b) => {
      const energyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return energyOrder[b.energyRequirement] - energyOrder[a.energyRequirement];
    });
  }
  
  return filtered;
}

/**
 * Select exercises for the workout
 */
function selectExercises(exercises, count, focusArea) {
  if (exercises.length === 0) {
    throw new Error('No suitable exercises found for the given criteria');
  }
  
  // Shuffle exercises for variety
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  
  // Select the required number of exercises
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // If we need more exercises and focus area is not fullbody, add complementary exercises
  if (selected.length < count && focusArea !== 'fullbody') {
    const complementary = exercisesData.exercises.filter(ex => 
      !selected.includes(ex) && 
      (ex.focusAreas.includes('core') || ex.focusAreas.includes('cardio'))
    );
    
    const additionalCount = count - selected.length;
    const shuffledComplementary = complementary.sort(() => Math.random() - 0.5);
    selected.push(...shuffledComplementary.slice(0, additionalCount));
  }
  
  return selected;
}

/**
 * Build the complete workout plan with sets, reps, and rest periods
 */
function buildWorkoutPlan(exercises, params, energyLevel, totalTime) {
  const workoutExercises = exercises.map(exercise => {
    // Determine sets based on energy level
    let sets = params.baseSets;
    
    // Adjust reps based on exercise type and energy level
    let reps;
    if (exercise.repsType === 'time') {
      reps = exercise.defaultReps;
      // Adjust time-based exercises for energy level
      if (energyLevel === 'low') {
        reps = reps.replace(/\d+/g, match => Math.max(15, parseInt(match) - 10));
      } else if (energyLevel === 'high') {
        reps = reps.replace(/\d+/g, match => parseInt(match) + 10);
      }
    } else {
      reps = exercise.defaultReps;
      // Adjust count-based exercises for energy level
      if (energyLevel === 'low') {
        reps = Math.max(8, Math.floor(reps * 0.75));
      } else if (energyLevel === 'high') {
        reps = Math.ceil(reps * 1.25);
      }
    }
    
    return {
      name: exercise.name,
      sets: sets,
      reps: reps,
      restSeconds: params.restSeconds,
      description: exercise.description,
      equipment: exercise.equipment,
      focusAreas: exercise.focusAreas
    };
  });
  
  // Calculate estimated calories burned (rough estimate)
  const estimatedCalories = calculateCalories(totalTime, energyLevel);
  
  return {
    totalTime: totalTime,
    exercises: workoutExercises,
    estimatedCalories: estimatedCalories,
    energyLevel: energyLevel,
    exerciseCount: workoutExercises.length
  };
}

/**
 * Calculate estimated calories burned
 */
function calculateCalories(timeMinutes, energyLevel) {
  let caloriesPerMinute;
  
  switch (energyLevel.toLowerCase()) {
    case 'low':
      caloriesPerMinute = 4;
      break;
    case 'medium':
      caloriesPerMinute = 6;
      break;
    case 'high':
      caloriesPerMinute = 8;
      break;
    default:
      caloriesPerMinute = 6;
  }
  
  return Math.round(timeMinutes * caloriesPerMinute);
}

module.exports = {
  generateWorkout
};

// Made with Bob
