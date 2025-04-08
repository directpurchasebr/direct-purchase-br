'use client';

import { Comprador } from "@apimodel/payload/intefaces";
import { uiStyles } from "@lib/ui-styles";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

interface Props {
    value: Comprador[];
    onChange: (value: Comprador[]) => void;
}

export default function CompradorDualList({ value, onChange }: Props) {
    const [disponiveis, setDisponiveis] = useState<Comprador[]>([]);
    const [selecionados, setSelecionados] = useState<Comprador[]>([]);
    const [comprador, setComprador] = useState<Array<Comprador>>([]);

    useEffect(() => {
        internalService.comprador.listar().then((res) => {
            if (res) {
                setComprador(res);
            }
        });
    }, []);

    useEffect(() => {
        if (!comprador || !value) return;

        const selecionadosIds = new Set(value.map(c => c.compradorId));
        setDisponiveis(comprador.filter(c => !selecionadosIds.has(c.compradorId)));
        setSelecionados(value);
    }, [comprador, value]);

    const adicionar = (c: Comprador) => {
        const novos = [...selecionados, c];
        setSelecionados(novos);
        setDisponiveis(disponiveis.filter(d => d.compradorId !== c.compradorId));
        onChange(novos);
    };

    const remover = (c: Comprador) => {
        const novaLista = selecionados.filter(s => s.compradorId !== c.compradorId);
        setSelecionados(novaLista);
        setDisponiveis([...disponiveis, c]);
        onChange(novaLista);
    };

    return (
        <div className={uiStyles.collections.dualListContainer}>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Disponíveis</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {disponiveis.map((c) => (
                        <div
                            key={`disponivel-${c.compradorId}`}
                            className={uiStyles.collections.dualListItem}
                            onClick={() => adicionar(c)}
                        >
                            {c.nome}
                        </div>
                    ))}
                </div>
            </div>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Selecionados</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {selecionados.map((c) => (
                        <div
                            key={`selecionado-${c.compradorId}`}
                            className={uiStyles.collections.dualListItemSelected}
                            onClick={() => remover(c)}
                        >
                            {c.nome}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
