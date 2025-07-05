"use client";

import { Fornecedor, Produto } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import { internalService } from "@services/internal-service";
import { getNestedValue } from "@utils/functios-utils";
import { useEffect, useState } from "react";
import { ProdutoFilter } from "./produto-filter";
import ProdutoModal from "@components/views/produto/produto-modal";
import { CustomButton } from "@components/utils/custom-button";

export default function ProdutosGridSelector() {
    const [produtos, setProdutos] = useState<Array<Produto>>([]);
    const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>(undefined);
    const [descricaoFiltro, setDescricaoFiltro] = useState<string>("");
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);

    useEffect(() => {
        internalService.produto.listar().then((res) => res && setProdutos(res));
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    const handleItemClick = (item: Produto) => {
        setSelectedProduto(item);
        console.log(selectedProduto);
    };

    const consultaProdutos = async () => {
        try {

            // fornecedorId: fornecedor?.fornecedorId ?? null,

            //  const consultaPedido = {
            //                 codigoPedido: codigo.trim() === '' ? null : codigo,
            //                 dataPedido: dataPedido.trim() === '' ? null : dataPedido,
            //                 compradorId: comprador?.compradorId ?? null,
            //             } as ConsultaPedido;

            const res = await internalService.produto.buscar(descricaoFiltro);
            if (res) setProdutos(res);
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
        }
    };

    const fields = [
        { label: 'ID', value: 'produtoId', width: '60px' },
        { label: 'Código', value: 'codigo', width: '100px' },
        { label: 'Descrição', value: 'descricao', width: '570px', fontSize: 'xs' },
        { label: 'Fornecedor', value: 'fornecedor.nome', width: '380px', fontSize: 'xs' },
        {
            label: 'Preço',
            value: 'preco',
            width: '100px',
            render: (item: Produto) => {
                const valor = getNestedValue(item, 'preco') ?? 0;
                return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
            }
        },
    ];

    return (
        <div className="p-6">
            <ProdutoFilter
                descricao={descricaoFiltro}
                setDescricao={setDescricaoFiltro}
                fornecedor={fornecedor ?? {} as Fornecedor}
                setFornecedor={setFornecedor}
                fornecedores={fornecedores}
                onPesquisar={consultaProdutos}
            />

            <CustomListGrid
                items={produtos}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Produtos"
                isCadastrar={true}
                itemsPerPage={10}
                renderActions={(selectedPessoa) => (
                    <ProdutoModal
                        trigger={
                            <CustomButton
                                variant="outline"
                                className="bg-blue-500 text-white p-2 rounded w-28">
                                Editar
                            </CustomButton>
                        }
                        initialData={selectedPessoa}
                    />
                )}
            />

        </div>
    )
}