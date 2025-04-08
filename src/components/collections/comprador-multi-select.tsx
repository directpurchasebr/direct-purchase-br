'use client';

import { Comprador } from "@apimodel/payload/intefaces";

interface Props {
    value: Comprador[];
    onChange: (value: Comprador[]) => void;
    options: Array<Comprador>;
}

export default function CompradorMultiSelector({ value, onChange, options }: Props) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(event.target.selectedOptions, option => Number(option.value));
        const selectedCompradores = options.filter(option => selectedIds.includes(option.compradorId));
        onChange(selectedCompradores);
    };

    return (
        <select multiple value={value.map(v => String(v.compradorId))} onChange={handleChange} className="w-full border p-2">
            {options.map(option => (
                <option key={option.compradorId} value={option.compradorId}>
                    {option.nome}
                </option>
            ))}
        </select>
    );
}
