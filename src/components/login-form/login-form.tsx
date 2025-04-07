"use client";

import { getSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

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
        <div>
            <div>
                <img src="logo_t.png" alt="LogoDirect" className="w-56 h-56 mb-2 mx-auto" />
            </div>

            <form
                onSubmit={login}
                className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
                <h2 className="font-bold text-lg xl mb-3">Faça seu Login</h2>
                <input
                    name="usuario"
                    type="text"
                    placeholder="Usuario"
                    className=" input input-primary w-full"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    className=" input input-primary w-full"
                />
                <button className="btn btn-light w-full"> Login</button>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>

        </div>
    );
}