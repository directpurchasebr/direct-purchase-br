'use client';

import { useEffect, useState } from 'react';
import { internalService } from '@services/internal-service';
import { uiStyles } from '@lib/ui-styles';
import { Comprador } from '@apimodel/payload/intefaces';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function CompradorSelector({ value, onChange }: Props) {
    const [comprador, setComprador] = useState<Array<Comprador>>([]);

    useEffect(() => {
        internalService.comprador.listar().then((res) => {
            if (res) {
                setComprador(res);
            }
        });
    }, []);

    return (
        <div className="w-full">
            <select
                className={uiStyles.forms.select}
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                <option value="">Selecione um cliente</option>
                {comprador?.map((comprador) => (
                    <option key={comprador.compradorId} value={comprador.nome}>
                        {comprador.nome}
                    </option>
                ))}
            </select>
        </div>
    );
}
