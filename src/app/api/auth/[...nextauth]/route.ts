import NextAuth, { Credentials, DeviceInfo, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import redis from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import { SessionStrategy } from 'next-auth';
import { coreService } from "@services/core-service";

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
                token.user = user;
            }
            return token;
        },
        // @ts-ignore
        async session({ session, token }) {
            session.sessionId = token.sessionId as string;
            session.user = token.user as User;
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                usuario: { label: "usuario", type: "text" },
                password: { label: "password", type: "text" },
                deviceId: { label: "Device ID", type: "text" },
                deviceInfo: { label: "Device Info", type: "text" },
            },
            async authorize(credentials, req) {
                const { usuario, password, deviceId, deviceInfo } = credentials ?? {};
                try {
                    let parsedDeviceInfo: DeviceInfo | null = null;

                    if (deviceInfo) {
                        try {
                            parsedDeviceInfo = JSON.parse(deviceInfo) as DeviceInfo;
                        } catch (error) {
                        }
                    }

                    const body = {
                        usuario: usuario,
                        senha: password,
                        deviceId: deviceId,
                        deviceInfo: parsedDeviceInfo,
                    } as Credentials;

                    const usuarioLogado = await coreService.auth.login(body);

                    if (!usuarioLogado) {
                        throw new Error("Usuário não encontrado ou senha incorreta");
                    }

                    const user: User = {
                        ...usuarioLogado,
                        id: usuarioLogado.login,
                    };

                    if (!!user && user.accessToken) {
                        const sessionId = uuidv4();
                        await redis.set(sessionId, JSON.stringify(user));
                        user.sessionId = sessionId;

                        return {
                            ...user,
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