import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server"

export default withAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: ({ token }) => {
            // se o token existir, está autenticado
            return !!token
        },
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/usuario/:path*",
        "/fornecedores/:path*",
        "/produtos/:path*",
        "/pedidos/:path*",
        "/contato/:path*",
        "/novopedido/:path*",
    ],
}
