"use client";

import { Comprador, ConsultaPedido, Pedido, PedidoFornecedor } from "@apimodel/payload/intefaces";
import { PedidoFiltros } from "@app/pedidos/pedido-filtros";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import { internalService } from "@services/internal-service";
import { getNestedValue } from "@utils/functios-utils";
import { useEffect, useState } from "react";


export default function PedodosGridSelector() {
    const [pedidos, setPedidos] = useState<Array<PedidoFornecedor>>([]);
    const [selectedPedido, setSelectedPedido] = useState<PedidoFornecedor | undefined>(undefined);
    const [compradores, setCompradores] = useState<Comprador[]>([]);
    const [codigo, setCodigo] = useState('');
    const [comprador, setComprador] = useState<Comprador | null>(null);
    const [dataPedido, setDataPedido] = useState('');

    useEffect(() => {
        internalService.pedido.listarFornecedor().then((res) => res && setPedidos(res));
        internalService.comprador.listar().then((res) => res && setCompradores(res));
    }, []);

    const handleItemClick = (item: PedidoFornecedor) => {
        setSelectedPedido(item);
        console.log(selectedPedido);
    };

    const consultaPedidos = async () => {
        try {
            const consultaPedido = {
                codigoPedido: codigo.trim() === '' ? null : codigo,
                dataPedido: dataPedido.trim() === '' ? null : dataPedido,
                compradorId: comprador?.compradorId ?? null,
            } as ConsultaPedido;

            const res = await internalService.pedido.consultarFornecedor(consultaPedido);
            if (res) setPedidos(res);
        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
        }
    };

    const limparFiltros = () => {
        setCodigo('');
        setComprador(null);
        setDataPedido('');
    };

    const fields = [
        { label: 'ID', value: 'pedidoId', width: '60px' },
        { label: 'Código', value: 'codigoPedido', width: '200px' },
        { label: 'Comprador', value: 'comprador.nome', width: '400px' },
        {
            label: 'Data Pedido',
            value: 'dataPedido',
            width: '200px',
            render: (item: Pedido) => {
                const data = getNestedValue(item, 'dataPedido');
                if (!data) return '';
                return new Date(data).toLocaleDateString('pt-BR');
            }
        },
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
            <PedidoFiltros
                codigo={codigo}
                setCodigo={setCodigo}
                comprador={comprador ?? {} as Comprador}
                setComprador={setComprador}
                compradores={compradores}
                dataPedido={dataPedido}
                setDataPedido={setDataPedido}
                onPesquisar={consultaPedidos}
                onLimpar={limparFiltros}
            />

            <CustomListGrid
                items={pedidos}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Pedidos"
                isGerarRelatorio={true}
                templateName="pedido-fornecedor-relatorio"
                itemsPerPage={10}
            />
        </div>
    );
}
