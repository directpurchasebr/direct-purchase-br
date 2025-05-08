import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/login',
        signOut: "/login",
    },
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: [
        // ignora api/auth, arquivos estáticos, etc.
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
};
