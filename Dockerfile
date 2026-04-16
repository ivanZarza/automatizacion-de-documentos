# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
ARG NUXT_APP_BASE_URL
ENV NUXT_APP_BASE_URL=$NUXT_APP_BASE_URL
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Copy built application from builder
COPY --from=builder --chown=nuxt:nodejs /app/.output /app/.output
COPY --from=builder --chown=nuxt:nodejs /app/package*.json /app/

# Install production dependencies only
RUN npm ci --omit=dev

# Switch to non-root user
USER nuxt

# Expose port
EXPOSE 3000

# Start application
CMD ["node", ".output/server/index.mjs"]
