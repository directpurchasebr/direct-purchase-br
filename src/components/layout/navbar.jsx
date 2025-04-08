'use client';

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import Container from "./container";
import ConfigTrigger from './config-trigger';

export default function Navbar() {

    const { data: session } = useSession();
    return (
        session ? (
            <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50" >
                <Container customClass="items-center">
                    <Link href="/dashboard">
                        <img src="logo_img.png" alt="LogoDirect" className="w-14 h-14 hover:scale-105 transition-transform" />
                    </Link>

                    <ul className="flex gap-6 items-center text-gray-700 font-medium">
                        <li>
                            <Link href="/dashboard" className="hover:text-yellow-500 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/pedidos" className="hover:text-yellow-500 transition-colors">Pedidos</Link>
                        </li>
                        <li>
                            <Link href="/fornecedores" className="hover:text-yellow-500 transition-colors">Fornecedores</Link>
                        </li>
                        <li>
                            <Link href="/produtos" className="hover:text-yellow-500 transition-colors">Produtos</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-yellow-500 transition-colors">Contato</Link>
                        </li>

                        <ConfigTrigger />
                    </ul>
                </Container>
            </nav>
        ) : (<div></div>)
    );
}
