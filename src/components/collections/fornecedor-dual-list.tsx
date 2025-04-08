'use client';

import { Fornecedor } from "@apimodel/payload/intefaces";
import { uiStyles } from "@lib/ui-styles";
import { internalService } from "@services/internal-service";
import { useEffect, useState } from "react";

interface Props {
    value: Fornecedor[];
    onChange: (value: Fornecedor[]) => void;
}

export default function FornecedorDualList({ value, onChange }: Props) {
    const [disponiveis, setDisponiveis] = useState<Fornecedor[]>([]);
    const [selecionados, setSelecionados] = useState<Fornecedor[]>([]);
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    useEffect(() => {
        if (!fornecedores || !value) return;

        const selecionadosIds = new Set(value.map(f => f.fornecedorId));
        setDisponiveis(fornecedores.filter(f => !selecionadosIds.has(f.fornecedorId)));
        setSelecionados(value);
    }, [fornecedores, value]);

    const adicionar = (f: Fornecedor) => {
        const novos = [...selecionados, f];
        setSelecionados(novos);
        setDisponiveis(disponiveis.filter(d => d.fornecedorId !== f.fornecedorId));
        onChange(novos);
    };

    const remover = (f: Fornecedor) => {
        const novaLista = selecionados.filter(s => s.fornecedorId !== f.fornecedorId);
        setSelecionados(novaLista);
        setDisponiveis([...disponiveis, f]);
        onChange(novaLista);
    };

    return (
        <div className={uiStyles.collections.dualListContainer}>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Disponíveis</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {disponiveis.map((f) => (
                        <div
                            key={`disponivel-${f.fornecedorId}`}
                            className={uiStyles.collections.dualListItem}
                            onClick={() => adicionar(f)}
                        >
                            {f.nome}
                        </div>
                    ))}
                </div>
            </div>
            <div className={uiStyles.collections.dualListColumn}>
                <p className={uiStyles.collections.dualListTitle}>Selecionados</p>
                <div className="h-40 overflow-y-auto space-y-1">
                    {selecionados.map((f) => (
                        <div
                            key={`selecionado-${f.fornecedorId}`}
                            className={uiStyles.collections.dualListItemSelected}
                            onClick={() => remover(f)}
                        >
                            {f.nome}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
