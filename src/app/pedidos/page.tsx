"use client";

import { Pedido } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import { internalService } from "@services/internal-service";
import { getNestedValue } from "@utils/functios-utils";
import { useEffect, useState } from "react";

export default function PedodosGridSelector() {
    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | undefined>(undefined);

    useEffect(() => {
        internalService.pedido.listar().then((res) => res && setPedidos(res));
    }, []);

    const handleItemClick = (item: Pedido) => {
        setSelectedPedido(item);
    };

    const fields = [
        { label: 'ID', value: 'pedidoId', width: '60px' },
        { label: 'Código', value: 'codigoPedido', width: '200px' },
        { label: 'Comprador', value: 'comprador.nome', width: '400px' },
        {
            label: 'Valor',
            value: 'valorTotal',
            width: '200px',
            render: (item: Pedido) => {
                const valor = getNestedValue(item, 'valorTotal') ?? 0;
                return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
            }
        },
        {
            label: 'Status',
            value: 'status',
            width: '200px',

            render: (item: Pedido) => (
                <span className="font-bold text-green-600">{getNestedValue(item, 'status')}</span>
            )
        },
    ];

    return (
        <div className="p-6">
            <CustomListGrid
                items={pedidos}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Pedidos"
                isGerarRelatorio={true}
            />
        </div>
    )
}