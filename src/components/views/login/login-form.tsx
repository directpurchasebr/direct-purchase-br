"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const auxdata = {
            usuario: formData.get("usuario"),
            password: formData.get("password"),
        };
        const result = await signIn("credentials", {
            ...auxdata,
            callbackUrl: "/dashboard",
            redirect: false,
        });

        if (result?.error) {
            setErrorMessage("OOps, algo deu errado!");
        } else if (result?.url) {
            router.push(result.url);
        }
    }

    return (
        <div className="flex flex-col items-center" style={{ marginLeft: '425px' }}>
            <img src="/logo_t.png" alt="LogoDirect" className="w-56 h-56 mb-2" />

            <form onSubmit={login}
                className="bg-white p-10 rounded-lg w-96 max-w-full flex flex-col gap-4 shadow-md">
                <h2 className="font-bold text-lg text-center">Faça seu Login</h2>
                <input
                    name="usuario"
                    type="text"
                    placeholder="Usuário"
                    className="input input-primary w-full"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    className="input input-primary w-full"
                />
                <button type="submit" className="btn btn-light w-full">
                    Login
                </button>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            </form>
        </div>
    );
}