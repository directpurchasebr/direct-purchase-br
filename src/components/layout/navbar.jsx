import Container from "./container";
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="flex justify-between bg-gray-900 p-4">
            <Container>
                <Link href="/">
                    <img src="logo.svg" alt="LogoDirect" className="w-36 h-36" />
                </Link>
                <ul className="flex list-none items-center">
                    <li className="mr-4">
                        <Link href="/dashboard" className="text-white hover:text-yellow-400">Home</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/pedidos" className="text-white hover:text-yellow-400">Pedidos</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/fornecedores" className="text-white hover:text-yellow-400">Fornecedores</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/produtos" className="text-white hover:text-yellow-400">Produtos</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/contact" className="text-white hover:text-yellow-400">Contato</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/usuario" className="text-white hover:text-yellow-400">Configuração</Link>
                    </li>
                </ul>
            </Container>
        </div>
    )
}
