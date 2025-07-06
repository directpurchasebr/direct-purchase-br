# -------- Etapa 1: Build --------
FROM node:18-slim AS builder

WORKDIR /app

# Instala somente libs necessárias pro build funcionar
RUN apt-get update && apt-get install -y \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instala dependências
COPY package.json package-lock.json ./
RUN npm ci

# Copia código e variáveis de ambiente
COPY . .
COPY .env.production .env

# Gera o build de produção
RUN npm run build

# Remove devDependencies
RUN npm prune --production

# -------- Etapa 2: Runtime --------
FROM node:18-slim AS runner

WORKDIR /app

# Instala libs necessárias para Puppeteer
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

# Copia artefatos da build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Copia os templates Handlebars
COPY ./src/report/data/templates /app/src/report/data/templates


COPY --from=builder /app/.env .env

# Instala o Chrome via Puppeteer (salvo no cache interno do container)
ENV PUPPETEER_CACHE_DIR=/root/.cache/puppeteer
RUN npx puppeteer browsers install chrome

EXPOSE 3000
CMD ["npm", "start"]
