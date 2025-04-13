'use client';

import { Comprador, Fornecedor, Pedido } from '@apimodel/payload/intefaces';
import CustomSelector from '@components/collections/custom-selector';
import { Button } from "@components/views/tabela-pedido/button-tabela-pedido";
import { Plus } from '@phosphor-icons/react';
import { internalService } from '@services/internal-service';
import { FormEvent, useEffect, useState } from 'react';
import { useLinhasPedido } from './active-linha-pedido';
import LinhaPedido from './linha-pedido';

export default function TabelaPedidos() {
    const [clienteSelecionado, setClienteSelecionado] = useState<Comprador>('');
    const { linhas, addLinha, refreshLinha, refreshLinhaMulti } = useLinhasPedido();

    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);
    const [compradores, setCompradores] = useState<Array<Comprador>>([]);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
        internalService.comprador.listar().then((res) => res && setCompradores(res));

    }, []);


    const handleCriarPedido = async (e: FormEvent) => {
        e.preventDefault();

        const pedido = {} as Pedido;
        pedido.comprador = clienteSelecionado;

        pedido.produtos = linhas.map((linha, index) => ({
            pedidoProdutoId: index + 1,
            id: linha.id,
            fornecedor: linha.fornecedor,
            codigo: linha.codigo,
            produto: linha.produto,
            quantidade: linha.quantidade,
            unidade: linha.unidade,
            preco: linha.preco,
            precoTotal: linha.precoTotal,
        })
        );

        console.log('Salvar pedido');
    };

    return (
        <div className="p-4 font-mono text-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 w-[500px] mb-4">
                    <label className="whitespace-nowrap font-semibold text-gray-700">Cliente:</label>
                    <CustomSelector<Comprador>
                        value={clienteSelecionado}
                        onChange={setClienteSelecionado}
                        list={compradores}
                        getLabel={(c) => c.nome}
                        getKey={(c) => c.compradorId}
                        initText="Selecione um cliente"
                    />
                </div>
            </div>

            <table className="w-full table-fixed border border-gray-400 border-collapse">
                <thead className="bg-blue-100 font-bold text-gray-700">
                    <tr>
                        <th className="border border-gray-400 px-1 py-0.5 w-[120px]">Fornecedor</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Código</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[300px]">Produto</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Qtd</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Unidade</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Preço</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {linhas.map((linha: any) => (
                        <LinhaPedido
                            key={linha.id}
                            linha={linha}
                            onChange={refreshLinha}
                            onChangeMulti={refreshLinhaMulti}
                            fornecedores={fornecedores}
                        />
                    ))}
                </tbody>
            </table>

            <div className="mt-1">
                <Button onClick={addLinha} className="bg-blue-500 text-white p-2 rounded">
                    <Plus size={16} weight="bold" />
                    Adicionar Item
                </Button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4">
                <button onClick={handleCriarPedido}
                    className="w-full max-w-60 bg-red-600 hover:bg-red-700 text-white text-base font-semibold px-6 py-4 rounded-lg shadow transition"
                >
                    Finalizar Pedido
                </button>
            </div>

        </div>
    );
}
