FROM node:18 AS builder
WORKDIR /app

# 1. Copy root package management files
COPY package.json pnpm-lock.yaml* ./

# 2. Copy backend package.json
COPY apps/backend/package.json ./apps/backend/

# 3. Install dependencies (include --prod flag for production)
RUN npm install -g pnpm && \
    pnpm install 

# 4. Copy all source files
COPY . .

# 5. Build the project (if needed)
# RUN pnpm run build

# 6. Runtime stage
FROM node:18-alpine
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend ./apps/backend

# 7. Expose and run
EXPOSE 5000
CMD [ "pnpm", "--filter", "backend", "run", "dev" ]
