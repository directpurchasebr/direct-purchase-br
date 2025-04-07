'use client';

import React from 'react'
import LinkButton from '@components/layout/link-button'
import { Usuario } from '@apimodel/auth/interfaces';

interface Props {
    params: {
        user: Usuario;
    };
}

export default function Home({ params }: Props) {
    const { user } = params; 
    localStorage.setItem('accessToken', user.accessToken);
    
    return (
        <section className="w-full flex flex-col items-center justify-center p-16">
            <h1 className="text-4xl mb-2">
                Bem-vindo,
                <span className="text-yellow-400 px-1 bg-gray-900">
                    {user.nome}
                </span>
            </h1>
            <p className="mb-6 text-gray-500">Crie um novo pedido agora mesmo!</p>

            <LinkButton to="/newpedido" text="Criar pedido" />

            {/* <img src={savings} alt="Savings" className="w-[350px] my-8" /> */}
        </section>
    )
}
