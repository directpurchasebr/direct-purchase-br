import Link from 'next/link'
import { Gear } from '@phosphor-icons/react';
import { SignOut } from '@phosphor-icons/react';
import { signOut } from 'next-auth/react'

export default function ConfigTrigger() {
    return (
        <div className="relative group">
            <button className="flex items-center justify-center hover:text-yellow-500 transition-colors">
                <Gear size={22} />
            </button>
            <div className="absolute right-0 top-full w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:flex flex-col z-50">
                <Link href="/usuario" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Conta
                </Link>
                <Link href="/usuario/novo" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Criar Novo Usuário
                </Link>
                <Link href="/pagamento" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pagamento
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <SignOut size={22} />
                </button>

            </div>
        </div>
    )
}