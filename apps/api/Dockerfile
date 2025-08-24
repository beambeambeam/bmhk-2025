# Use Node.js 20 Alpine as base image
FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/eslint-config/package.json ./packages/eslint-config/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build stage
FROM base AS builder

# Build the API
RUN pnpm --filter api build

# Production stage
FROM node:20-alpine AS production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "apps/api/dist/index.js"]
