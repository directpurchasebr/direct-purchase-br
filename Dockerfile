# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json* ./

RUN npm ci

# Copia o restante da aplicação
COPY . .

# Copia o arquivo de variáveis de ambiente para o container
COPY .env.production .env

# Gera o build de produção
RUN npm run build

# Etapa 2: Runtime
FROM node:18-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copia os templates
COPY ./src/report/data/templates /app/src/report/data/templates

# Copia o mesmo .env usado no build
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["npm", "start"]
