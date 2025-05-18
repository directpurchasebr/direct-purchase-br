import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "@components/views/login/login-form";
import { authOptions } from "@lib/auth-options";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return (
        <div>
            <LoginForm />
        </div>
    );
}