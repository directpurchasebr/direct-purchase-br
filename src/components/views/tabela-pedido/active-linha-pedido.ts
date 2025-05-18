import { useState } from 'react';
import { LinhaTabela } from '@/src/types/intefaces';
import { Fornecedor, Produto } from '@apimodel/payload/intefaces';

export function useLinhasPedido() {
    const [linhas, setLinhas] = useState<LinhaTabela[]>([{
        id: 1, fornecedor: {} as Fornecedor, codigo: '', produto: {} as Produto, quantidade: 1,
        unidade: '', preco: 0, precoTotal: 0,
    }]);

    const clearLinhas = () => setLinhas([{
        id: 0,
        fornecedor: {} as Fornecedor,
        codigo: '',
        produto: {} as Produto,
        quantidade: 0,
        unidade: '',
        preco: 0,
        precoTotal: 0,
    }]);

    const addLinha = () => {
        const novaLinha: LinhaTabela = {
            id: linhas.length + 1,
            fornecedor: {} as Fornecedor, codigo: '', produto: {} as Produto,
            quantidade: 1, unidade: '', preco: 0, precoTotal: 0,
        };
        setLinhas([...linhas, novaLinha]);
    };

    const refreshLinha = (id: number, campo: keyof LinhaTabela, valor: any) => {
        setLinhas(prev => prev.map(l => l.id === id ? { ...l, [campo]: valor } : l));
    };

    const refreshLinhaMulti = (id: number, dados: Partial<LinhaTabela>) => {
        setLinhas(prev => prev.map(l => l.id === id ? { ...l, ...dados } : l));
    };

    return { linhas, addLinha, refreshLinha, refreshLinhaMulti, clearLinhas };
}
