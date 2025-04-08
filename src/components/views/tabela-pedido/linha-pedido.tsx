import PedidosLinha from './pedido-linha';
import InputSearchProduto from './busca-produto-input';
import FornecedorSelector from '../../collections/fornecedor-selector';
import { LinhaTabela } from '@/types/linha-table';
import { uiStyles } from '@lib/ui-styles';

type Props = {
    linha: LinhaTabela;
    onChange: (id: number, campo: keyof LinhaTabela, valor: any) => void;
    onChangeMulti: (id: number, dados: Partial<LinhaTabela>) => void;
};

export default function LinhaPedido({ linha, onChange, onChangeMulti }: Props) {
    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);

    return (
        <tr>
            <td className={uiStyles.tabelaPedido.classNameFornecedor}>
                <FornecedorSelector
                    value={linha.fornecedor}
                    onChange={(e: any) => onChange(linha.id, 'fornecedor', e.target.value)}
                    initText=""
                />
            </td>

            <PedidosLinha
                params={{
                    typeField: 'text',
                    field: linha.codigo,
                    editavel: false,
                    event: (e: any) => onChange(linha.id, 'codigo', e.target.value),
                    className: uiStyles.tabelaPedido.classNameDefault,
                    classNameInput: uiStyles.tabelaPedido.classNameInputDefault,
                }}
            />

            <td className={uiStyles.tabelaPedido.classNameProduto}>
                <InputSearchProduto
                    value={linha.produto}
                    className="w-full"
                    classNameInput={uiStyles.tabelaPedido.classNameInputDefault}
                    onSelect={(produtoSelecionado: any) => {
                        onChangeMulti(linha.id, {
                            fornecedor: produtoSelecionado.fornecedor?.nome ?? '',
                            produto: produtoSelecionado.descricao ?? '',
                            codigo: produtoSelecionado.codigo,
                            unidade: produtoSelecionado.unidade,
                            preco: produtoSelecionado.preco,
                            precoTotal: produtoSelecionado.preco * linha.quantidade,
                        });
                    }}
                />
            </td>

            <PedidosLinha
                params={{
                    typeField: 'number',
                    field: linha.quantidade,
                    editavel: true,
                    event: (e: any) => {
                        const novaQtd = parseFloat(e.target.value);
                        onChange(linha.id, 'quantidade', novaQtd);
                        onChange(linha.id, 'precoTotal', novaQtd * linha.preco);
                    },
                    className: uiStyles.tabelaPedido.classNameDefault,
                    classNameInput: uiStyles.tabelaPedido.classNameInputDefault,
                }}
            />

            <PedidosLinha
                params={{
                    typeField: 'text',
                    field: linha.unidade,
                    editavel: false,
                    event: (e: any) => onChange(linha.id, 'unidade', e.target.value),
                    className: uiStyles.tabelaPedido.classNameDefault,
                    classNameInput: uiStyles.tabelaPedido.classNameInputDefault,
                }}
            />

            <PedidosLinha
                params={{
                    typeField: 'text',
                    field: formatarMoeda(linha.preco),
                    editavel: true,
                    event: (e: any) => onChange(linha.id, 'preco', Number(e.target.value)),
                    className: uiStyles.tabelaPedido.classNameDefault,
                    classNameInput: uiStyles.tabelaPedido.classNameInputDefault,
                }}
            />

            <PedidosLinha
                params={{
                    typeField: 'text',
                    field: formatarMoeda(linha.precoTotal),
                    editavel: false,
                    event: (e: any) => onChange(linha.id, 'precoTotal', Number(e.target.value)),
                    className: uiStyles.tabelaPedido.classNameDefault,
                    classNameInput: uiStyles.tabelaPedido.classNameInputDefault,
                }}
            />
        </tr>
    );
}
