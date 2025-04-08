'use client';

import { useEffect, useState } from 'react';
import { internalService } from '@services/internal-service';
import { uiStyles } from '@lib/ui-styles';
import { Fornecedor } from '@apimodel/payload/intefaces';

interface Props {
    value: string;
    onChange: (value: string) => void;
    initText: string;
}

export default function FornecedorSelector({ value, onChange, initText }: Props) {
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
    }, []);

    const focusInputInCell = (cell: HTMLTableCellElement | null) => {
        const inputOrSelect = cell?.querySelector('input, select') as HTMLElement | null;
        inputOrSelect?.focus();
    };

    const handleArrowNavigation = (e: React.KeyboardEvent<HTMLSelectElement>) => {
        const currentCell = (e.target as HTMLElement).closest('td') as HTMLTableCellElement | null;
        const currentRow = currentCell?.parentElement as HTMLTableRowElement | null;
        if (!currentCell || !currentRow) return;

        let targetCell: HTMLTableCellElement | null = null;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                targetCell = currentCell.nextElementSibling as HTMLTableCellElement | null;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                targetCell = currentCell.previousElementSibling as HTMLTableCellElement | null;
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextRow = currentRow.nextElementSibling as HTMLTableRowElement | null;
                if (nextRow) {
                    targetCell = nextRow.cells[currentCell.cellIndex] as HTMLTableCellElement | null;
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevRow = currentRow.previousElementSibling as HTMLTableRowElement | null;
                if (prevRow) {
                    targetCell = prevRow.cells[currentCell.cellIndex] as HTMLTableCellElement | null;
                }
                break;
        }

        focusInputInCell(targetCell);
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <select
                className={uiStyles.collections.selectCustomTable}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleArrowNavigation}>

                <option value="" disabled>{initText}</option>
                {fornecedores?.map((fornecedor) => (
                    <option key={fornecedor.fornecedorId} value={fornecedor.nome}>
                        {fornecedor.nome}
                    </option>
                ))}
            </select>
        </div>
    );
}
