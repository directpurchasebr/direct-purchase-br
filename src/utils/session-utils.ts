import redis from "@/lib/redis";
import { authOptions } from "@lib/auth-options";
import { getServerSession, Session } from "next-auth";
import { headers } from "next/headers";

export async function getUserFromSession() {
    const session = await getServerSession(authOptions) as Session;
    if (!session || !session.sessionId) return null;
    const user = await redis.get(session.sessionId);
    return user ? JSON.parse(user) : null;
}

export async function getIpFromSession() {
    const forwarded = await headers().then(headers => headers.get("x-forwarded-for"));
    if (forwarded) {
        const ips = forwarded.split(",");
        return ips[0].trim();
    }
    return null;
}