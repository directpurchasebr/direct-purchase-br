"use client";

import { Fornecedor } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/cusom-list-grid";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

export default function FuncionarioGridSelector() {
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));

    }, []);


    const handleItemClick = (item: any) => {
        console.log("Selecionado:", item);
        // redirecionar para /produtos/[id] ou abrir modal, etc.
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lista de Produtos</h1>
            <CustomListGrid
                items={fornecedores}
                fields={["fornecedorId", "codigo", "nome"]}
                onItemClick={handleItemClick}
            />
        </div>
    )
}