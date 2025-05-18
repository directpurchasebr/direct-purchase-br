"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [deviceInfo, setDeviceJson] = useState<string | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        console.log(session);
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    useEffect(() => {
        let localId = localStorage.getItem("deviceId");
        if (!localId) {
            import('uuid').then((mod) => {
                const newId = mod.v4();
                localId = newId;
            });
        }

        localStorage.setItem("deviceId", localId);

        const device = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
        };

        setDeviceJson(JSON.stringify(device));
        setDeviceId(localId);
    }, []);

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
            deviceId,
            deviceInfo,
        });

        if (result?.error) {
            setErrorMessage("OOps, algo deu errado!");
        } else if (result?.url) {
            router.push(result.url);
        }
    }

    return (
        <div className="flex flex-col items-center" style={{ marginLeft: '435px' }}>
            <img src="/logoem_t.png" alt="LogoDirect" className="w-56 h-56 mb-4" />

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
                {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
                >
                    Login
                </button>
            </form>
        </div>
    );
}