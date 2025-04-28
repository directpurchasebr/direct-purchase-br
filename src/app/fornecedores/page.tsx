"use client";

import { Fornecedor, Pessoa, ProdutosExcel, Status } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { CustomButton } from "@components/layout/custom-button";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "@components/utils/full-screen-loader";
import { SuccessDialog } from "@components/utils/success-dialog";

export default function FornecedorGridSelector() {
    const [status, setStatus] = useState<Status | null>(null);
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    const handleItemClick = (item: Pessoa) => {
        console.log('Item selecionado:', item);
        setSelectedPessoa(item);
    };

    const fields = [
        { label: 'ID', value: 'fornecedorId' },
        { label: 'Codigo', value: 'codigo' },
        { label: 'Nome', value: 'nome' },
        { label: 'CNPJ', value: 'cnpj' },
    ];

    const handleFileUpload = async (file: File) => {
        setIsLoading(true)

        if (!selectedPessoa) {
            console.error("Nenhuma pessoa selecionada.");
            setIsLoading(false)
            return;
        }

        const fornecedor = fornecedores.find((f) => f.pessoaId === selectedPessoa.pessoaId);
        if (!fornecedor) {
            console.error("Fornecedor correspondente não encontrado.");
            return;
        }

        const excel: ProdutosExcel = {
            fornecedorId: fornecedor.fornecedorId,
            file: file,
        };

        const formData = new FormData();
        formData.append('fornecedorId', fornecedor.fornecedorId.toString());
        formData.append('file', file);


        try {
            await internalService.produto.importar(formData).then((res) => res && setStatus(res));
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
        } finally {
            setIsLoading(false)
        }

    };

    return (
        <div className="p-6">

            {isLoading && <FullScreenLoader message="Enviando arquivo..." />}

            <CustomListGrid
                items={fornecedores}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Fornecedores"
                novoRota="/fornecedores/cadastrar"
                importar={true}
                cadastrar={true}
                onFileUpload={handleFileUpload}
            />

            <PessoaModal
                trigger={
                    <CustomButton variant="outline" className="bg-blue-500 text-white p-2 rounded mt-4 md:grid-cols-3 gap-4 w-28">
                        Editar
                    </CustomButton>
                }
                initialData={selectedPessoa}
            />

            {status && (<SuccessDialog message={status.mensagem} />)}

        </div>
    )
}