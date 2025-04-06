import Redis from "ioredis";

const redis = new Redis(); // localhost:6379 por padrão
export default redis;