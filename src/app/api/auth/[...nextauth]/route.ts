import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { routes } from "@lib/routes";
import redis from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import api from "@app/services/api-axios";

const authOptions = {
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/",
    },
    session: { strategy: "jwt" },
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
                    const servico = routes.auth.login;
                    const { data } = await api.post(servico, {
                        usuario: credentials?.usuario,
                        senha: credentials?.password
                    });

                    if (data && data.accessToken) {
                        const sessionId = uuidv4();
                        await redis.set(sessionId, JSON.stringify(data));
                        data.sessionId = sessionId;

                        return {
                            ...data,
                            sessionId
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