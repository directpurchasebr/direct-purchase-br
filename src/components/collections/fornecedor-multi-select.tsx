'use client';

import { Fornecedor } from "@apimodel/payload/intefaces";

interface Props {
    value: Fornecedor[];
    onChange: (value: Fornecedor[]) => void;
    options: Array<Fornecedor>;
}

export default function FornecedorMultiSelector({ value, onChange, options }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(event.target.selectedOptions, option => Number(option.value));
        const selectedFornecedores = options.filter(option => selectedIds.includes(option.fornecedorId));
        onChange(selectedFornecedores);
    };

    return (
        <select multiple value={value.map(v => String(v.fornecedorId))} onChange={handleChange} className="w-full border p-2">
            {options.map(option => (
                <option key={option.fornecedorId} value={option.fornecedorId}>
                    {option.nome}
                </option>
            ))}
        </select>
    );
}
