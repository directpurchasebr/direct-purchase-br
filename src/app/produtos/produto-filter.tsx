"use client";

import { Dispatch, SetStateAction } from "react";
import { CustomButton } from "@components/utils/custom-button";
import { uiStyles } from "@lib/ui-styles";
import { Fornecedor } from "@apimodel/payload/intefaces";
import CustomSelector from "@components/collections/custom-selector";

interface ProdutoFilterProps {
    descricao: string;
    setDescricao: Dispatch<SetStateAction<string>>;
    fornecedor: Fornecedor;
    setFornecedor: Dispatch<SetStateAction<Fornecedor | null>>;
    fornecedores: Fornecedor[];
    onPesquisar: () => void;
}

export function ProdutoFilter({
    descricao, setDescricao,
    fornecedor, setFornecedor,
    fornecedores,
    onPesquisar }: ProdutoFilterProps) {
    return (
        <div className="flex items-end gap-3 mb-4">
            <div className="flex flex-col">
                <label htmlFor="descricao" className="text-sm font-medium">
                    Filtrar por Descrição:
                </label>
                <input
                    id="descricao"
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-96"
                    placeholder="Digite parte da descrição..."
                />
            </div>

            <div className="flex flex-col w-60">
                <label className={uiStyles.forms.label}>Fornecedor</label>
                <CustomSelector<Fornecedor>
                    value={fornecedor}
                    onChange={(value) => value !== null && setFornecedor(value)}
                    list={fornecedores}
                    getLabel={(c) => c.nome}
                    getKey={(c) => c.fornecedorId}
                    initText="Selecione um Fornecedor"
                />
            </div>

            <CustomButton
                onClick={onPesquisar}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Pesquisar
            </CustomButton>
        </div>
    );
}
