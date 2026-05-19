# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1. Start the Application
```bash
cd workout-recommendation-service
docker-compose up -d
```

### 2. Access the Application
Open your browser and navigate to:
```
http://localhost:3001
```

### 3. Use the Application
- Adjust the **time slider** (15-90 minutes)
- Select your **focus area** (Abs, Arms, Shoulders, etc.)
- Choose your **energy level** (Low, Medium, High)
- Watch your personalized workout appear instantly!

## Stopping the Application
```bash
docker-compose down
```

## Viewing Logs
```bash
docker-compose logs -f
```

## Rebuilding After Changes
```bash
docker-compose up --build
```

## Troubleshooting

### Port Already in Use
If port 3001 is already in use, edit `docker-compose.yml` and change:
```yaml
ports:
  - "3001:3001"
```
to:
```yaml
ports:
  - "8080:3001"  # or any other available port
```

### Container Won't Start
Check the logs:
```bash
docker logs workout-recommendation-service
```

### Need to Reset Everything
```bash
docker-compose down
docker-compose up --build
```

## Testing the API Directly

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Get Workout Recommendation
```bash
curl -X POST http://localhost:3001/api/workout/recommend \
  -H "Content-Type: application/json" \
  -d '{"timeMinutes": 45, "focusArea": "abs", "energyLevel": "medium"}'
```

## What's Next?

- Customize exercises in `server/data/exercises.json`
- Modify styling in `client/src/App.css`
- Add new features to the recommendation algorithm
- Deploy to cloud platforms (AWS, Google Cloud, Azure)

---

**Need help?** Check the full [README.md](README.md) for detailed documentation.