'use client';

import React, { useEffect } from 'react'
import LinkButton from '@components/layout/link-button'
import { UsuarioLogado } from '@apimodel/auth/interfaces';
import { internalService } from '@services/internal-service';
import { signOut } from 'next-auth/react';
import { Status } from '@apimodel/payload/intefaces';

interface Props {
    params: {
        user: UsuarioLogado;
    };
}

export default function HomeApp({ params }: Props) {
    const { user } = params;

    const handleValidateToken = async () => {
        try {
            const status = await internalService.auth.validateToken().then((res) => res && res) as Status;
            if (status?.mensagem !== 'OK') {
                signOut({ callbackUrl: "/login" });
            }
        } catch (error) {
            signOut({ callbackUrl: "/login" });
        }
    };

    // if (user.accessToken === null || user.accessToken === undefined) {
        handleValidateToken();
    // }

    useEffect(() => {
        localStorage.setItem('accessToken', user.accessToken);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center translate-x-80">
            <h1 className="text-5xl font-bold mb-4 text-gray-800">
                Bem-vindo, {user.nome}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Crie um novo pedido agora mesmo e agilize seu processo!
            </p>

            <LinkButton to="/novopedido" text="Criar pedido" />

        </div>
    )
}
