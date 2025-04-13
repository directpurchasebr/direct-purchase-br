"use client";

import { Fornecedor, Pessoa } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/cusom-list-grid";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { CustomButton } from "@components/layout/custom-button";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

export default function FuncionarioGridSelector() {
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | undefined>(undefined);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    const handleItemClick = (item: Pessoa) => {
        console.log('Item selecionado:', item);
        setSelectedPessoa(item);
    };

    return (
        <div className="p-6">
            <CustomListGrid
                items={fornecedores}
                fields={["fornecedorId", "codigo", "nome"]}
                onItemClick={handleItemClick}
                titulo="Fornecedores"
            />

            <PessoaModal
                trigger={
                    <CustomButton variant="outline" className="bg-blue-500 text-white p-2 rounded mt-4 md:grid-cols-3 gap-4 w-28">
                        Editar
                    </CustomButton>
                }
                initialData={selectedPessoa}
            />
        </div>
    )
}