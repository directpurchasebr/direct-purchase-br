'use client';

import { useEffect, useState } from 'react';
import { fornecedorIntService } from '@services/internal/fornecedor-int-service';
import { Comprador } from '@apimodel/payload/intefaces';
import { compradorIntService } from '@services/internal/comprador-int-service';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function CompradorSelector({ value, onChange }: Props) {
    const [comprador, setComprador] = useState<Array<Comprador>>([]);

    useEffect(() => {
        compradorIntService.compradores().then((res) => {
            if (res) {
                setComprador(res);
            }
        });
    }, []);

    return (
        <div>
            <select
                className="flex-1 border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                <option value="">Selecione um cliente</option>
                {comprador.map((comprador) => (
                    <option key={comprador.compradorId} value={comprador.nome}>
                        {comprador.nome}
                    </option>
                ))}
            </select>
        </div>
    );
}
