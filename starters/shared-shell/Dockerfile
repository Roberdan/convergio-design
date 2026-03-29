FROM node:20-alpine
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile=false
RUN pnpm build
CMD ["pnpm", "dev"]
