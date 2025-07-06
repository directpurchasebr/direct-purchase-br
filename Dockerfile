# syntax=docker/dockerfile:1.4

# -------- Etapa 1: Build --------
FROM node:18-slim AS builder

WORKDIR /app

ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Instala dependências básicas
RUN apt-get update && apt-get install -y \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# Puppeteer vai baixar o Chromium automaticamente aqui
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .
COPY .env.production .env

ENV DISABLE_REDIS=true

RUN npm run build
RUN npm prune --production

# -------- Etapa 2: Runtime --------
FROM node:18-slim AS runner

WORKDIR /app

# Instala dependências do Chrome headless
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    fonts-noto-cjk \
    fonts-freefont-ttf \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libxshmfence1 \
    libglu1-mesa \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Copia o app e o Chromium baixado pelo Puppeteer
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Copia os templates Handlebars
COPY ./src/report/data/templates /app/src/report/data/templates

COPY --from=builder /app/.env .env
COPY --from=builder /app/.cache/puppeteer /app/.cache/puppeteer

EXPOSE 3000
CMD ["npm", "start"]