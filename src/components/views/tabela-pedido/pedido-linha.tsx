import { useRef } from 'react';

interface Props {
    params: {
        field: any;
        className: string;
        classNameInput: string;
        typeField: string;
        event: any;
        editavel: boolean;
    };
}

export default function PedidosLinha({ params }: Props) {
    const { field, typeField, className, classNameInput, event, editavel } = params;
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInputInCell = (cell: HTMLTableCellElement | null) => {
        const input = cell?.querySelector('input') as HTMLInputElement | null;
        input?.focus();
    };

    const handleArrowNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const current = inputRef.current;
        if (!current) return;

        const currentCell = current.closest('td') as HTMLTableCellElement | null;
        const currentRow = current.closest('tr') as HTMLTableRowElement | null;
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

    const value = field ?? '';

    return (
        <td className={className}>
            <input
                ref={inputRef}
                type={typeField === 'number' ? 'number' : 'text'}
                value={value}
                onChange={event}
                onKeyDown={handleArrowNavigation}
                className={classNameInput}
                readOnly={!editavel}
            />
        </td>
    );
}
