'use client';

import { useEffect, useState } from 'react';
import { internalService } from '@services/internal-service';
import { uiStyles } from '@lib/ui-styles';
import { Perfil } from '@apimodel/payload/intefaces';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function PerfilSelector({ value, onChange }: Props) {
    const [perfil, setPerfil] = useState<Array<Perfil>>([]);

    useEffect(() => {
        internalService.perfil.listar().then((res) => res && setPerfil(res));
    }, []);

    return (
        <div className="w-full">
            <select
                className={uiStyles.forms.select}
                value={value}
                onChange={(e) => onChange(e.target.value)}>
                <option value="">Selecione um perfil</option>
                {perfil.map((perfil) => (
                    <option key={perfil.perfilId} value={perfil.descricao}>
                        {perfil.descricao}
                    </option>
                ))}
            </select>
        </div>
    );
}
