import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import redis from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import fetcherUtils from "@utils/fetcher-utils";
import { apiRoutes } from "@lib/api-routers";
import { SessionStrategy } from 'next-auth';

const authOptions = {
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
    },
    session: { strategy: 'jwt' as SessionStrategy, },
    callbacks: {
        // @ts-ignore
        async jwt({ token, user }) {
            if (user) {
                token.sessionId = user.sessionId;
            }
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            session.sessionId = token.sessionId as string;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                usuario: { label: "usuario", type: "text" },
                password: { label: "password", type: "text" },
            },
            async authorize(credentials, req) {
                try {
                    const usuer = await fetcherUtils<User>(apiRoutes.auth.login, 'POST', {
                        usuario: credentials?.usuario,
                        senha: credentials?.password
                    });

                    if (usuer && usuer.accessToken) {
                        const sessionId = uuidv4();
                        await redis.set(sessionId, JSON.stringify(usuer));
                        usuer.sessionId = sessionId;

                        return {
                            ...usuer,
                            sessionId: sessionId
                        };
                    }

                    return null;
                } catch (error) {
                    console.error('Erro na autenticação:', error);
                    return null;
                }
            }
        })
    ],
}

// @ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions as authOptions }