import NextAuth, { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import HttpUtils from "../../util/http-utils";
import { TokenUtils } from "../../util/token-utils";

const handler = NextAuth({
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/",
    },
    providers: [
        CredentialsProvider({

            credentials: {
                usuario: { label: "usuario", type: "text" },
                password: { label: "password", type: "text" }
            },

            async authorize(credentials, req) {

                const request = {
                    usuario: credentials?.usuario,
                    senha: credentials?.password
                };

                if (!credentials?.usuario || !credentials?.password) {
                    throw new Error('Por favor, forneça login e password.');
                }

                return HttpUtils(`${process.env.API_URL}/login`, {
                    method: 'POST',
                    body: request
                }).then(async (resp) => {
                    if (!resp.ok) throw new Error('Usuario ou senha invalidos!')
                    const body = await resp.body;
                    TokenUtils.save(body.token);
                    return body.token
                })


            }
        })
    ]
})

export { handler as GET, handler as POST }