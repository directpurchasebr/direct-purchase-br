'use client';

import Link from 'next/link';
import { FolderPlus, IdentificationCard } from '@phosphor-icons/react';

export default function CadastroTrigger() {
    return (
        <div className="relative group">  
            <button className="flex items-center justify-center hover:text-yellow-500 transition-colors">
                <IdentificationCard size={22} />
                <span className="ml-1">Cadastros</span>
            </button>
            <div className="absolute right-0 top-full w-48 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:flex flex-col z-50">
                <Link href="/fornecedores" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Fornecedores
                </Link>
                <Link href="/compradores" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Compradores
                </Link>
                <Link href="/produtos" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Produtos
                </Link>
            </div>
        </div>
    );
}
