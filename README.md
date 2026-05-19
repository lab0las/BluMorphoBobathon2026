# 🏋️ Workout Recommendation Service

A modern web application that generates personalized workout plans based on your available time, focus area, and energy level. Built with React and Node.js, containerized with Docker for easy deployment.

## ✨ Features

- **Real-time Recommendations**: Workout plans update instantly as you adjust your preferences
- **Personalized Plans**: Customized based on:
  - Workout duration (15-90 minutes)
  - Focus area (Abs, Arms, Shoulders, Legs, Back, Chest, Full Body)
  - Energy level (Low, Medium, High)
- **Comprehensive Exercise Database**: 40+ exercises with detailed instructions
- **Modern UI**: Responsive design that works on desktop and mobile
- **Docker Ready**: Single container deployment with Docker Compose

## 🚀 Quick Start

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Running with Docker (Recommended)

1. **Clone or download this repository**

2. **Navigate to the project directory**
   ```bash
   cd workout-recommendation-service
   ```

3. **Build and start the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Open your browser and go to: `http://localhost:3001`
   - The application will be ready to use!

5. **Stop the application**
   ```bash
   docker-compose down
   ```

### Running in Development Mode (Without Docker)

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3001`

#### Frontend Setup

1. **Open a new terminal and navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React app**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 📖 How to Use

1. **Set Your Workout Duration**
   - Use the slider to select how long you want to exercise (15-90 minutes)

2. **Choose Your Focus Area**
   - Select which muscle group you want to target:
     - **Abs & Core**: Core strengthening exercises
     - **Arms**: Biceps and triceps workouts
     - **Shoulders**: Shoulder development exercises
     - **Legs**: Lower body and glute exercises
     - **Back**: Back strengthening movements
     - **Chest**: Chest development exercises
     - **Full Body**: Complete body workouts

3. **Select Your Energy Level**
   - **Low Energy**: Lighter workout with more rest periods
   - **Medium Energy**: Balanced workout intensity
   - **High Energy**: Intense workout with shorter rest periods

4. **View Your Personalized Workout**
   - The workout plan updates automatically as you adjust settings
   - Each exercise includes:
     - Number of sets and reps
     - Rest time between sets
     - Detailed instructions
     - Equipment needed (if any)

## 🏗️ Project Structure

```
workout-recommendation-service/
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkoutForm.jsx       # Input controls
│   │   │   ├── WorkoutDisplay.jsx    # Workout results
│   │   │   └── ExerciseCard.jsx      # Individual exercise
│   │   ├── services/
│   │   │   └── api.js                # API communication
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # Styling
│   │   └── index.js                  # Entry point
│   └── package.json
├── server/                      # Express backend
│   ├── data/
│   │   └── exercises.json            # Exercise database
│   ├── routes/
│   │   └── workout.js                # API routes
│   ├── services/
│   │   └── recommendationEngine.js   # Workout algorithm
│   ├── server.js                     # Server entry point
│   └── package.json
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
├── .dockerignore               # Docker ignore rules
└── README.md                   # This file
```

## 🔧 API Endpoints

### POST `/api/workout/recommend`
Generate a workout recommendation

**Request Body:**
```json
{
  "timeMinutes": 45,
  "focusArea": "abs",
  "energyLevel": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "workout": {
    "totalTime": 45,
    "exerciseCount": 6,
    "estimatedCalories": 270,
    "exercises": [
      {
        "name": "Plank",
        "sets": 3,
        "reps": "60 seconds",
        "restSeconds": 60,
        "description": "Hold a push-up position...",
        "equipment": "none"
      }
    ]
  }
}
```

### GET `/api/workout/focus-areas`
Get available focus areas

### GET `/api/workout/energy-levels`
Get available energy levels

### GET `/api/health`
Health check endpoint

## 🎨 Technology Stack

- **Frontend**: React 18, Axios
- **Backend**: Node.js, Express
- **Containerization**: Docker, Docker Compose
- **Package Manager**: NPM

## 🔄 Workout Algorithm

The recommendation engine considers multiple factors:

1. **Time Allocation**
   - 15-30 min: 5 exercises, 2-3 sets each
   - 30-45 min: 6 exercises, 3 sets each
   - 45-60 min: 7 exercises, 3-4 sets each
   - 60-90 min: 9 exercises, 4 sets each

2. **Energy Level Adjustments**
   - **Low**: Fewer sets, longer rest (90s), lower intensity
   - **Medium**: Standard sets, moderate rest (60s)
   - **High**: More sets, shorter rest (45s), higher intensity

3. **Exercise Selection**
   - Filters by focus area
   - Matches energy requirements
   - Includes complementary exercises for balance

## 🐳 Docker Commands

**Build the image:**
```bash
docker-compose build
```

**Start the service:**
```bash
docker-compose up
```

**Start in detached mode:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop the service:**
```bash
docker-compose down
```

**Rebuild and restart:**
```bash
docker-compose up --build
```

## 🛠️ Configuration

### Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (production/development)

### Customization

To add more exercises, edit `server/data/exercises.json`:

```json
{
  "id": "unique-id",
  "name": "Exercise Name",
  "focusAreas": ["abs", "core"],
  "difficulty": "beginner",
  "timePerSet": 2,
  "equipment": "none",
  "description": "How to perform...",
  "energyRequirement": "medium",
  "repsType": "count",
  "defaultReps": 15
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 For Gym Owners

This application is perfect for:
- Providing quick workout plans to members
- Helping beginners get started
- Offering variety in workout routines
- Supporting members with different fitness levels

### Deployment Tips

1. **Cloud Deployment**: Deploy to AWS, Google Cloud, or Azure using Docker
2. **Custom Domain**: Point your gym's domain to the deployed application
3. **Branding**: Customize colors and logo in `client/src/App.css`
4. **Exercise Library**: Add your gym's specific equipment and exercises

## 📝 License

MIT License - Feel free to use this for your gym!

## 🙏 Support

For issues or questions:
1. Check the logs: `docker-compose logs`
2. Verify Docker is running: `docker ps`
3. Ensure port 3001 is available

## 🎯 Future Enhancements

Potential features to add:
- User accounts and workout history
- Progress tracking and analytics
- Video demonstrations for exercises
- Workout plan saving and sharing
- Integration with fitness trackers
- Multi-language support
- Custom exercise library management

---

**Built with ❤️ for fitness enthusiasts**