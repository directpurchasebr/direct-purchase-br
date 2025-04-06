import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    sessionId?: string;
  }

  interface User {
    nome: string;
    email: string;
    accessToken: string;
    login: string;
    roles: string[];
    sessionId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sessionId?: string;
  }
}