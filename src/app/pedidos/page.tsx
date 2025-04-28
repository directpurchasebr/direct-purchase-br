"use client";

import { Pedido } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import { CustomButton } from "@components/layout/custom-button";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

export default function PedodosGridSelector() {
    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);
    const [selectedPedido, setSelectedPedido] = useState<Pedido | undefined>(undefined);

    useEffect(() => {
        internalService.pedido.listar().then((res) => res && setPedidos(res));
    }, []);

    const handleItemClick = (item: Pedido) => {
        console.log('Item selecionado:', item);
        setSelectedPedido(item);
    };

    const fields = [
        { label: 'ID', value: 'pedidoId' },
        { label: 'Codigo', value: 'codigoPedido' },
        { label: 'Comprador', value: 'comprador.nome' },
        { label: 'Valor', value: 'valorTotal' },
        { label: 'Status', value: 'status' },
    ];

    return (
        <div className="p-6">
            <CustomListGrid
                items={pedidos}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Pedidos"
            />


        </div>
    )
}