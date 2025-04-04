import React from 'react'
import LinkButton from '@/components/layout/link-button'

const Home: React.FC = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center p-16">
            <h1 className="text-4xl mb-2">
                Bem-vindo ao <span className="text-yellow-400 px-1 bg-gray-900">Direct Purchase BR</span>
            </h1>
            <p className="mb-6 text-gray-500">Crie um novo pedido agora mesmo!</p>

            <LinkButton to="/newpedido" text="Criar pedido" />

            {/* <img src={savings} alt="Savings" className="w-[350px] my-8" /> */}
        </section>
    )
}

export default Home;
