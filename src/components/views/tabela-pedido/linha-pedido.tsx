import { LinhaTabela } from '@/types/linha-table';
import { Fornecedor } from '@apimodel/payload/intefaces';
import CustomSelector from '@components/collections/custom-selector';
import { uiStyles } from '@lib/ui-styles';
import InputSearchProduto from './busca-produto-input';
import PedidosLinha from './pedido-linha';
import PedidosLinhaDinheiro from './pedidos-linha-dinheiro';

type Props = {
    linha: LinhaTabela;
    onChange: (id: number, campo: keyof LinhaTabela, valor: any) => void;
    onChangeMulti: (id: number, dados: Partial<LinhaTabela>) => void;
    fornecedores: Array<Fornecedor>;
};

export default function LinhaPedido({ linha, onChange, onChangeMulti, fornecedores }: Props) {

    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);

    return (
        <tr>
            <td className={uiStyles.tabelaPedido.classNameFornecedor}>
                <CustomSelector<Fornecedor>
                    value={linha.fornecedor ?? null}
                    onChange={(fornecedor) => onChange(linha.id, 'fornecedor', fornecedor)}
                    list={fornecedores}
                    getLabel={(c) => c.nome}
                    getKey={(c) => c.fornecedorId}
                    initText=""
                    className={uiStyles.collections.selectCustomTable}
                    enableArrowNavigation={true}
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
                    value={linha.produto?.descricao ?? ''}
                    className="w-full"
                    classNameInput={uiStyles.tabelaPedido.classNameInputProduto}
                    onSelect={(produtoSelecionado: any) => {
                        onChangeMulti(linha.id, {
                            fornecedor: produtoSelecionado.fornecedor,
                            produto: produtoSelecionado,
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

            <PedidosLinhaDinheiro
                params={{
                    field: linha.preco,
                    editavel: true,
                    event: (e: any) => {
                        const novoPreco = e.target.value;
                        onChange(linha.id, 'preco', novoPreco);
                        onChange(linha.id, 'precoTotal', novoPreco * linha.quantidade);
                    },
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
