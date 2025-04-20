'use client';

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import Container from "./container";
import ConfigTrigger from './config-trigger';
import { Plus } from '@phosphor-icons/react';
import CadastroTrigger from './cadastro-trigger';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        session ? (
            <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <Container customClass="items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <img src="logo_img.png" alt="LogoDirect" className="w-14 h-14 hover:scale-105 transition-transform" />
                        </Link>
                        <Link href="/novopedido"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-4 py-2 rounded-lg shadow transition-all flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Novo Pedido
                        </Link>
                    </div>

                    <ul className="flex gap-8 items-center text-gray-700 font-medium text-sm">
                        <li>
                            <Link href="/dashboard" className="hover:text-yellow-500 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/pedidos" className="hover:text-yellow-500 transition-colors">Pedidos</Link>
                        </li>
                        <li>
                            <Link href="/contato" className="hover:text-yellow-500 transition-colors">Contato</Link>
                        </li>
                        <li className="ml-2">
                            <CadastroTrigger />
                        </li>
                        <li className="ml-2">
                            <ConfigTrigger />
                        </li>
                    </ul>
                </Container>
            </nav>
        ) : (<div></div>)
    );
}
