// src/lib/redis.ts
import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (process.env.DISABLE_REDIS === "true") {
    console.log("🔌 Redis desativado (DISABLE_REDIS=true).");
    return null;
  }

  if (!process.env.REDIS_URL) {
    console.warn("⚠️ REDIS_URL não definida no ambiente.");
    return null;
  }

  if (!redis) {
    redis = new Redis(process.env.REDIS_URL);

    redis.on("error", (err) => {
      console.warn("Erro ao conectar no Redis:", err.message);
    });
  }

  return redis;
}

// (opcional) exporta como default para manter compatibilidade:
export default getRedis();
