"use client";

import { Comprador } from "@apimodel/payload/intefaces";
import CustomSelector from "@components/collections/custom-selector";
import React, { Dispatch, SetStateAction } from "react";

interface Fornecedor {
    id: string;
    nome: string;
}

interface PedidoFiltrosProps {
    codigo: string;
    setCodigo: React.Dispatch<React.SetStateAction<string>>;
    comprador: Comprador;
    setComprador: Dispatch<SetStateAction<Comprador | null>>;
    dataPedido: string;
    setDataPedido: React.Dispatch<React.SetStateAction<string>>;
    compradores: Comprador[];
    onPesquisar: () => void;
    onLimpar: () => void;
}

export const PedidoFiltros: React.FC<PedidoFiltrosProps> = ({
    codigo, setCodigo,
    comprador, setComprador,
    dataPedido, setDataPedido,
    compradores,
    onPesquisar
}) => {
    return (
        <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div className="flex flex-col">
                <label className="text-sm font-medium">Código</label>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="border p-2 rounded w-60"
                />
            </div>

            <div className="flex flex-col w-60">
                <label className="text-sm font-medium">Cliente</label>

                <CustomSelector<Comprador>
                    value={comprador}
                    onChange={(value) => value !== null && setComprador(value)}
                    list={compradores}
                    getLabel={(c) => c.nome}
                    getKey={(c) => c.compradorId}
                    initText="Selecione um cliente"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium">Data do Pedido</label>
                <input
                    type="date"
                    value={dataPedido}
                    onChange={(e) => setDataPedido(e.target.value)}
                    className="border p-2 rounded w-60"
                />
            </div>
            <button
                onClick={onPesquisar}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Pesquisar
            </button>

        </div>
    );
};
