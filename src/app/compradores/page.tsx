"use client";

import { Comprador, Pessoa, Status } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { CustomButton } from "@components/utils/custom-button";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";
import { mask } from 'remask';
import { getNestedValue } from "@utils/functios-utils";

export default function CompradorGridSelector() {
    const [compradores, setCompradores] = useState<Array<Comprador>>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        internalService.comprador.listar().then((res) => res && setCompradores(res));
    }, []);

    const handleItemClick = (item: Pessoa) => {
        setSelectedPessoa(item);
    };

    const fields = [
        { label: 'ID', value: 'compradorId', width: '60px' },
        { label: 'Código', value: 'codigo', width: '200px' },
        { label: 'Nome', value: 'nome', width: '400px' },
        {
            label: 'CNPJ/CPF',
            value: 'cnpj',
            width: '200px',
            render: (item: Comprador) => {
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

    return (
        <div className="p-6">
            <CustomListGrid
                items={compradores}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Compradores"
                rotaCadastro="/compradores/cadastrar"
                isCadastrar={true}
                renderActions={(selectedPessoa) => (
                    <PessoaModal
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
            {/* {status && (<SuccessDialog message={status.mensagem} />)} */}

        </div>
    )
}