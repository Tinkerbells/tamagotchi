FROM node:18 AS builder
WORKDIR /app

# 1. Copy root package files
COPY apps/mini-app/package.json ./apps/mini-app/

COPY apps/mini-app/package-lock.json ./apps/mini-app/

# 2. Copy frontend package.json
COPY apps/mini-app/package.json ./apps/mini-app/

# 3. Install dependencies
RUN npm install -g pnpm 

RUN pnpm install --frozen-lockfile 
# 4. Copy all source files
COPY . .

# 5. Build project
RUN pnpm --filter mini-app run build

# 6. Runtime stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output and nginx config
COPY --from=builder /app/apps/mini-app/build .
COPY apps/mini-app/nginx.conf /etc/nginx/conf.d/default.conf

# 7. Expose and run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
