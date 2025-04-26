"use client";

import { Comprador, Pessoa } from "@apimodel/payload/intefaces";
import { CustomListGrid } from "@components/collections/custom-list-grid";
import PessoaModal from "@components/views/pessoa/pessoal-modal";
import { CustomButton } from "@components/layout/custom-button";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

export default function CompradorGridSelector() {
    const [compradores, setCompradores] = useState<Array<Comprador>>([]);
    const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | undefined>(undefined);

    useEffect(() => {
        internalService.comprador.listar().then((res) => res && setCompradores(res));
    }, []);

    const handleItemClick = (item: Pessoa) => {
        console.log('Item selecionado:', item);
        setSelectedPessoa(item);
    };

    const fields = [
        { label: 'ID', value: 'compradorId' },
        { label: 'Codigo', value: 'codigo' },
        { label: 'Nome', value: 'nome' },
        { label: 'CNPJ', value: 'cnpj' },
    ];

    return (
        <div className="p-6">
            <CustomListGrid
                items={compradores}
                fields={fields}
                onItemClick={handleItemClick}
                titulo="Compradores"
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