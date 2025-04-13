'use client';

import { uiStyles } from '@lib/ui-styles';

interface CustomSelectorProps<T> {
    value: T;
    onChange: (value: T) => void;
    list: Array<T>;
    getLabel: (item: T) => string;
    getKey: (item: T) => string | number;
    initText?: string;
    className?: string;
    enableArrowNavigation?: boolean;
}

export default function CustomSelector<T>({ value, onChange, list, getLabel, getKey,
    initText = 'Selecione uma opção', className = uiStyles.forms.select,
    enableArrowNavigation = false }: CustomSelectorProps<T>) {

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
        <div className="w-full">
            <select
                className={className}
                value={value ? String(getKey(value)) : ''}
                onChange={(e) => {
                    const selected = list.find((item) => String(getKey(item)) === e.target.value);
                    if (selected) onChange(selected);
                }}
                onKeyDown={enableArrowNavigation ? handleArrowNavigation : undefined}
            >
                <option value="" disabled>{initText}</option>
                {list.map((item) => (
                    <option key={getKey(item)} value={String(getKey(item))}>
                        {getLabel(item)}
                    </option>
                ))}
            </select>
        </div>
    );
}
