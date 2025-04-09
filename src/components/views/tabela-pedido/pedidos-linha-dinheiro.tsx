import { useRef } from 'react';
import { NumericFormat } from 'react-number-format';

interface Props {
    params: {
        field: number;
        className: string;
        classNameInput: string;
        event: any;
        editavel: boolean;
    };
}

interface Values {
    formattedValue: string;
    value: string;
    floatValue: number | undefined;
}

export default function PedidosLinhaDinheiro({ params }: Props) {
    const { field, className, classNameInput, event, editavel } = params;
    const inputRef = useRef(null);

    return (
        <td className={className}>
            <NumericFormat
                getInputRef={inputRef}
                value={field}
                onValueChange={(values: Values) => {
                    const { floatValue } = values;
                    if (editavel && floatValue !== undefined) {
                        event({ target: { value: floatValue } });
                    }
                }}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                className={classNameInput}
                readOnly={!editavel}
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
            />
        </td>
    );
}
