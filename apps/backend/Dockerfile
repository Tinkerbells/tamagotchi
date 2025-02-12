FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@tamagotchi/api --docker

# Installer
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

COPY . .

WORKDIR /app/apps/backend

# Run database commands and then start the backend service
# RUN pnpm db:generate
# RUN pnpm db:migrate

EXPOSE 8080

# Run backend service from the correct directory
CMD ["pnpm", "dev"]
