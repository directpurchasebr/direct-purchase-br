import { headers } from "next/headers";
import redis from "@/lib/redis";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function getUserFromSession() {
    // @ts-ignore
    const session = await getServerSession(authOptions) as Session;
    if (!session || !session.sessionId) return null;
    const user = await redis.get(session.sessionId);
    return user ? JSON.parse(user) : null;
}
