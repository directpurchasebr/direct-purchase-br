import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/login',
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
