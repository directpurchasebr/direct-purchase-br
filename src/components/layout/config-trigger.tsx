'use client';

import { Status } from '@apimodel/payload/intefaces';
import { Gear, SignOut } from '@phosphor-icons/react';
import { internalService } from '@services/internal-service';
import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ConfigTrigger() {

    const { data: session } = useSession();
    const user = session?.user as User;
    const naoPodeCriarNovoUsuario: boolean = !!user?.roles?.includes('USER');

    const handleLogout = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const status = await internalService.auth.logout().then((res) => res && res) as Status;
            if (status?.mensagem === 'OK') {
                console.log('Logout realizado com sucesso');
            }
        } catch (error) {
            console.error('Erro no logout:', error);
        }
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="relative group">
            <button className="flex items-center justify-center hover:text-yellow-500 transition-colors">
                <Gear size={22} />
            </button>
            <div className="absolute right-0 top-full w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:flex flex-col z-50">
                <Link href="/usuario" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Conta
                </Link>

                {!naoPodeCriarNovoUsuario && (
                    <Link href="/usuario/novo" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Criar Novo Usuário
                    </Link>
                )}

                <Link href="/pagamento" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pagamento
                </Link>
                <button onClick={handleLogout}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                    <SignOut size={22} />
                    <span>Sair</span>
                </button>

            </div>
        </div>
    )
}