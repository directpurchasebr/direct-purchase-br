"use client";

import { signIn } from "next-auth/react";
import React from "react";



export default function LoginForm() {
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = {
            usuario: formData.get("usuario"),
            password: formData.get("password"),
        };
        signIn("credentials", {
            ...data,
            callbackUrl: "/dashboard",
        });
    }

    return (
        <div>
            <div>
                <img src="logo.svg" alt="LogoDirect" className="w-56 h-56 mb-2 mx-auto" />
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
            </form>

        </div>
    );
}