'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

type Produto = {
  id: number;
  nome: string;
};

type LinhaTabela = {
  id: number;
  produtoId: number | null;
  quantidade: number;
  observacoes: string;
};

const produtosCadastrados: Produto[] = [
  { id: 1, nome: 'Notebook' },
  { id: 2, nome: 'Teclado' },
  { id: 3, nome: 'Mouse' },
];

export default function EditableTable() {
  const [linhas, setLinhas] = useState<LinhaTabela[]>([
    { id: 1, produtoId: null, quantidade: 1, observacoes: '' },
  ]);

  const adicionarLinha = () => {
    const novaLinha: LinhaTabela = {
      id: linhas.length + 1,
      produtoId: null,
      quantidade: 1,
      observacoes: '',
    };
    setLinhas([...linhas, novaLinha]);
  };

  const atualizarLinha = (id: number, campo: keyof LinhaTabela, valor: any) => {
    const atualizadas = linhas.map((linha) =>
      linha.id === id ? { ...linha, [campo]: valor } : linha
    );
    setLinhas(atualizadas);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Produto</th>
            <th className="border px-2 py-1">Quantidade</th>
            <th className="border px-2 py-1">Observações</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.id}>
              <td className="border px-2 py-1">
                <select
                  className="w-full border rounded p-1"
                  value={linha.produtoId ?? ''}
                  onChange={(e) =>
                    atualizarLinha(linha.id, 'produtoId', Number(e.target.value))
                  }
                >
                  <option value="">Selecione</option>
                  {produtosCadastrados.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  min="1"
                  value={linha.quantidade}
                  onChange={(e) =>
                    atualizarLinha(linha.id, 'quantidade', Number(e.target.value))
                  }
                  className="w-full border rounded p-1"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={linha.observacoes}
                  onChange={(e) =>
                    atualizarLinha(linha.id, 'observacoes', e.target.value)
                  }
                  className="w-full border rounded p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Button onClick={adicionarLinha} className="bg-blue-500 text-white p-2 rounded">
          Adicionar Item
        </Button>
      </div>
    </div>
  );
}
