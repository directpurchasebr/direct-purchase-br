"use client";

import { Comprador } from "@apimodel/payload/intefaces";
import CustomSelector from "@components/collections/custom-selector";
import { uiStyles } from "@lib/ui-styles";
import React, { Dispatch, SetStateAction } from "react";

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
        <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex flex-col w-48">
                <label className={uiStyles.forms.label}>Código</label>
                <input
                    name="codigo"
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className={uiStyles.forms.input}
                />
            </div>

            <div className="flex flex-col w-60">
                <label className={uiStyles.forms.label}>Cliente</label>
                <CustomSelector<Comprador>
                    value={comprador}
                    onChange={(value) => value !== null && setComprador(value)}
                    list={compradores}
                    getLabel={(c) => c.nome}
                    getKey={(c) => c.compradorId}
                    initText="Selecione um cliente"
                />
            </div>

            <div className="flex flex-col w-48">
                <label className={uiStyles.forms.label}>Data do Pedido</label>
                <input
                    name="dataPedido"
                    type="date"
                    value={dataPedido}
                    onChange={(e) => setDataPedido(e.target.value)}
                    className={uiStyles.forms.input}
                />
            </div>

            <div className="flex">
                <button
                    onClick={onPesquisar}
                    className="bg-blue-600 text-white px-4 py-2 rounded h-10 mt-auto"
                >
                    Pesquisar
                </button>
            </div>
        </div>

    );
};
