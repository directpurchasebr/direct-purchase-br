import { UsuarioLogado } from "@apimodel/auth/interfaces";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    sessionId?: string;
  }

  interface User extends UsuarioLogado {
    sessionId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sessionId?: string;
  }
}