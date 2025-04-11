'use client';

import { useEffect, useState } from 'react';
import { uiStyles } from '@lib/ui-styles';

interface CustomDualListProps<T> {
    value: T[];
    onChange: (value: T[]) => void;
    list: T[];
    getKey: (item: T) => string | number;
    getLabel: (item: T) => string;
}

export default function CustomDualList<T>({ value, onChange, list, getKey, getLabel, }: CustomDualListProps<T>) {
    const [disponiveis, setDisponiveis] = useState<T[]>([]);
    const [selecionados, setSelecionados] = useState<T[]>([]);

    useEffect(() => {
        if (!list || !value) return;

        const selecionadosIds = new Set(value.map(getKey));
        setDisponiveis(list.filter((item) => !selecionadosIds.has(getKey(item))));
        setSelecionados(value);
    }, [list, value]);

    const adicionar = (item: T) => {
        const novos = [...selecionados, item];
        setSelecionados(novos);
        setDisponiveis(disponiveis.filter((d) => getKey(d) !== getKey(item)));
        onChange(novos);
    };

    const remover = (item: T) => {
        const novaLista = selecionados.filter((s) => getKey(s) !== getKey(item));
        setSelecionados(novaLista);
        setDisponiveis([...disponiveis, item]);
        onChange(novaLista);
    };

    return (
        <div className={uiStyles.collections.dualListContainer}>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Disponíveis</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {disponiveis.map((item) => (
                        <div
                            key={`disponivel-${getKey(item)}`}
                            className={uiStyles.collections.dualListItem}
                            onClick={() => adicionar(item)}
                        >
                            {getLabel(item)}
                        </div>
                    ))}
                </div>
            </div>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Selecionados</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {selecionados.map((item) => (
                        <div
                            key={`selecionado-${getKey(item)}`}
                            className={uiStyles.collections.dualListItemSelected}
                            onClick={() => remover(item)}
                        >
                            {getLabel(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
