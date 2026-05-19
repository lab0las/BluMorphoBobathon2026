# Multi-stage build for optimized production image

# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install dependencies
RUN npm install --production

# Copy client source code
COPY client/ ./

# Build React app for production
RUN npm run build

# Stage 2: Setup Node.js backend and serve frontend
FROM node:18-alpine

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy server source code
COPY server/ ./

# Copy built React app from frontend-build stage
COPY --from=frontend-build /app/client/build ./client/build

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "server.js"]

# Made with Bob
