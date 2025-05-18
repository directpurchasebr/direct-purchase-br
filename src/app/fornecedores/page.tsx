"use client";

import { Fornecedor, Pessoa, Status } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { CustomButton } from "@components/utils/custom-button";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";
import { FullScreenLoader } from "@components/utils/full-screen-loader";
import { SuccessDialog } from "@components/utils/success-dialog";
import { mask } from 'remask';
import { getNestedValue } from "@utils/functios-utils";

export default function FornecedorGridSelector() {
    const [status, setStatus] = useState<Status | null>(null);
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    const handleItemClick = (item: Pessoa) => {
        setSelectedPessoa(item);
    };

    const fields = [
        { label: 'ID', value: 'fornecedorId', width: '60px' },
        { label: 'Código', value: 'codigo', width: '200px' },
        { label: 'Nome', value: 'nome', width: '400px' },
        {
            label: 'CNPJ/CPF',
            value: 'cnpj',
            width: '200px',
            render: (item: Fornecedor) => {
                const cnpj = getNestedValue(item, 'cnpj');
                const cpf = getNestedValue(item, 'cpf');
                const rawValue = cnpj || cpf || '';

                const maskedValue = cnpj
                    ? mask(rawValue, ['99.999.999/9999-99'])
                    : mask(rawValue, ['999.999.999-99']);

                return <span className="font-bold text-green-600">{maskedValue}</span>;
            }
        },
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

        // const excel: ProdutosExcel = {
        //     fornecedorId: fornecedor.fornecedorId,
        //     file: file,
        // };

        const formData = new FormData();
        formData.append('fornecedorId', fornecedor.fornecedorId.toString());
        formData.append('file', file);

        try {
            await internalService.fornecedor.importar(formData).then((res) => res && setStatus(res));
        } catch (error) {
            console.error('Erro ao enviar arquivo:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const pessoaToFornecedor = (pessoa: Pessoa): Fornecedor => {
        return {
            fornecedorId: 0,
            layoutExcel: '',
            pessoaId: pessoa.pessoaId,
            negocioId: pessoa.negocioId,
            codigo: pessoa.codigo,
            nome: pessoa.nome,
            nomeFantasia: pessoa.nomeFantasia,
            cpf: pessoa.cpf,
            cnpj: pessoa.cnpj,
            inscricaoEstadual: pessoa.inscricaoEstadual,
            inscricaoMunicipal: pessoa.inscricaoMunicipal,
            telefone: pessoa.telefone,
            email: pessoa.email,
            site: pessoa.site,
            responsavel: pessoa.responsavel,
            telefoneResponsavel: pessoa.telefoneResponsavel,
            observacoes: pessoa.observacoes,
            enderecos: pessoa.enderecos,
            bancos: pessoa.bancos,
        };
    };


    return (
        <div className="p-6">

            {isLoading && <FullScreenLoader message="Enviando arquivo..." />}

            <CustomListGrid
                items={fornecedores}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Fornecedores"
                rotaCadastro="/fornecedores/cadastrar"
                isImportar={true}
                isCadastrar={true}
                onFileUpload={handleFileUpload}
                renderActions={(selectedPessoa) => (
                    <PessoaModal
                        trigger={
                            <CustomButton
                                variant="outline"
                                className="bg-blue-500 text-white p-2 rounded w-28">
                                Editar
                            </CustomButton>
                        }
                        onSave={(selectedPessoa) => {
                            const fornecedor = pessoaToFornecedor(selectedPessoa);
                            internalService.fornecedor.salvar(fornecedor).then((res) => res && setStatus(res));
                        }}
                        initialData={selectedPessoa}
                    />
                )}
            />

            {status && (<SuccessDialog message={status.mensagem} />)}

        </div>
    )
}