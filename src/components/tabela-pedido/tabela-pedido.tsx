'use client';

import { useState } from 'react';
import LinhaPedido from './linha-pedido';
import { Button } from "@/src/components/form/button";
import CompradorSelector from './comprador-selector';
import { useLinhasPedido } from './active-linha-pedido';

export default function TabelaPedidos() {
    const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
    const { linhas, addLinha, refreshLinha, refreshLinhaMulti } = useLinhasPedido();

    return (
        <div className="p-4 font-mono text-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 w-[500px] mb-4">
                    <label className="whitespace-nowrap font-semibold text-gray-700">Cliente:</label>
                    <CompradorSelector
                        value={clienteSelecionado}
                        onChange={setClienteSelecionado}
                    />
                </div>
            </div>

            <table className="w-full table-fixed border border-gray-400 border-collapse">
                <thead className="bg-blue-100 font-bold text-gray-700">
                    <tr>
                        <th className="border border-gray-400 px-1 py-0.5 w-[100px]">Fornecedor</th>
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
                        />
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <Button onClick={addLinha} className="bg-blue-500 text-white p-2 rounded">
                    Adicionar Item
                </Button>
            </div>
        </div>
    );
}
