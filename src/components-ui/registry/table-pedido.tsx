"use client";

import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const TablePedido = () => {
    const [data, setData] = useState([
        { id: 1, nome: 'João', idade: 30 },
        { id: 2, nome: 'Maria', idade: 25 },
    ]);

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const columns = React.useMemo(
        () => [
            { header: 'ID', accessorKey: 'id' },
            { header: 'Nome', accessorKey: 'nome' },
            { header: 'Idade', accessorKey: 'idade' },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleAdicionar = () => {
        const novoRegistro = {
            id: data.length + 1,
            nome,
            idade: parseInt(idade),
        };

        setData([...data, novoRegistro]);
        setNome('');
        setIdade('');
    };

    return (
        <div className="p-4">
            <table className="w-full text-left border-collapse mb-4">
                <thead className="bg-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-300 p-2">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border border-gray-300">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className="border p-2 rounded"
                />
                <button onClick={handleAdicionar} className="bg-blue-500 text-white p-2 rounded">
                    Adicionar
                </button>
            </div>
        </div>
    );
};

export default TablePedido;