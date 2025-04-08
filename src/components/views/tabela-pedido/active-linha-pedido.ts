import { useState } from 'react';
import { LinhaTabela } from '@/types/linha-table';

export function useLinhasPedido() {
    const [linhas, setLinhas] = useState<LinhaTabela[]>([{
        id: 1, fornecedor: '', codigo: '', produto: '', quantidade: 1,
        unidade: '', preco: 0, precoTotal: 0,
    }]);

    const addLinha = () => {
        const novaLinha: LinhaTabela = {
            id: linhas.length + 1,
            fornecedor: '', codigo: '', produto: '',
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

    return { linhas, addLinha, refreshLinha, refreshLinhaMulti };
}
