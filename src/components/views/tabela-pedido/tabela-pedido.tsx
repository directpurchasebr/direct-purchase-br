'use client';

import { Comprador, Fornecedor, Pedido, Status } from '@apimodel/payload/intefaces';
import CustomSelector from '@components/collections/custom-selector';
import { CustomButton } from "@components/utils/custom-button";
import { Plus } from '@phosphor-icons/react';
import { internalService } from '@services/internal-service';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLinhasPedido } from './active-linha-pedido';
import LinhaPedido from './linha-pedido';
import { uiStyles } from '@lib/ui-styles';
import { FullScreenLoader } from '@components/utils/full-screen-loader';
import { v4 as uuidv4 } from "uuid";
import { RelatorioButton, RelatorioButtonRef } from '@components/utils/relatorio-button';

export default function TabelaPedidos() {
    const [status, setStatus] = useState<Status | null>(null);
    const [clienteSelecionado, setClienteSelecionado] = useState<Comprador>({} as Comprador);
    const { linhas, addLinha, refreshLinha, refreshLinhaMulti } = useLinhasPedido();
    const [isLoading, setIsLoading] = useState(false);
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);
    const [compradores, setCompradores] = useState<Array<Comprador>>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataRelatorio, setDataRelatorio] = useState<any>([]);
    const relatorioRef = useRef<RelatorioButtonRef>(null);

    useEffect(() => {
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));
        internalService.comprador.listar().then((res) => res && setCompradores(res));
    }, []);

    useEffect(() => {
        if (dataRelatorio && relatorioRef.current) {
            relatorioRef.current.gerarRelatorio();
        }
    }, [dataRelatorio]);

    const totalGeral = linhas.reduce((acc, linha) => acc + (linha.precoTotal || 0), 0);

    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);


    const handleCriarPedido = async (e: FormEvent) => {
        e.preventDefault();

        if (clienteSelecionado && !clienteSelecionado.compradorId) {
            setIsLoading(false)
            setStatus({
                status: false,
                mensagem: "Nenhuma pessoa selecionada!",
                erro: "Nenhuma pessoa selecionada!",
                body: null,
            })
            return;
        }

        const pedido = {} as Pedido;
        pedido.comprador = {
            compradorId: clienteSelecionado.compradorId,
            pessoaId: clienteSelecionado.pessoaId

        } as Comprador;

        pedido.valorTotal = totalGeral;

        pedido.produtos = linhas.map((linha, index) => ({
            pedidoProdutoId: index + 1,
            id: linha.id,
            fornecedor: linha.fornecedor,
            codigo: linha.codigo,
            produto: linha.produto,
            quantidade: linha.quantidade,
            unidade: linha.unidade,
            preco: linha.preco,
            precoTotal: linha.precoTotal,
        }));

        try {
            if (typeof window === "undefined") {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const Redis = require('ioredis');
                const redis = new Redis();

                const sessionId = uuidv4();
                await redis.set("pedidoId:" + sessionId, JSON.stringify(pedido));
            }

            const res = await internalService.pedido.salvar(pedido);
            if (res) {
                setStatus(res);

                setDataRelatorio({
                    descricaoComprador: clienteSelecionado?.nome || '',
                    valorTotal: totalGeral,
                    codigoPedido: res.body?.codigoPedido || '',
                    produtos: linhas.map(linha => ({
                        descricaofornecedor: linha.fornecedor?.nome,
                        codigo: linha.codigo,
                        descricaoProduto: linha.produto?.descricao,
                        quantidade: linha.quantidade,
                        unidade: linha.unidade,
                        preco: linha.preco,
                        precoTotal: linha.precoTotal,
                    })),
                });
            }

        } catch (error) {
            console.error('Erro ao salvar pedido:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="p-4 font-mono text-sm">

            {isLoading && <FullScreenLoader message="Salvando Pedido..." />}

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 w-[500px] mb-4">
                    <label className="whitespace-nowrap font-semibold text-gray-700">Cliente:</label>
                    <CustomSelector<Comprador>
                        value={clienteSelecionado}
                        onChange={(value) => value !== null && setClienteSelecionado(value)}
                        list={compradores}
                        getLabel={(c) => c.nome}
                        getKey={(c) => c.compradorId}
                        initText="Selecione um cliente"
                    />
                </div>
            </div>

            <table className="w-full table-fixed border border-gray-400 border-collapse">
                <thead className="bg-blue-100 font-bold text-gray-700">
                    <tr>
                        <th className="border border-gray-400 px-1 py-0.5 w-[150px]">Fornecedor</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Código</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[400px]">Produto</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Qtd</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Unidade</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[60px]">Preço</th>
                        <th className="border border-gray-400 px-1 py-0.5 w-[72px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {linhas.map((linha: any) => (
                        <LinhaPedido
                            key={linha.id}
                            linha={linha}
                            onChange={refreshLinha}
                            onChangeMulti={refreshLinhaMulti}
                            fornecedores={fornecedores}
                        />
                    ))}

                    <tr>
                        <td colSpan={6} className={uiStyles.tabelaPedido.classNameTotal}>
                            Total Geral:
                        </td>
                        <td className={uiStyles.tabelaPedido.classNameTotalValor}>
                            {formatarMoeda(totalGeral)}
                        </td>
                    </tr>

                </tbody>
            </table>

            <div className="mt-1">
                <CustomButton onClick={addLinha} className="bg-blue-500 text-white p-2 rounded">
                    <Plus size={16} weight="bold" />
                    Adicionar Item
                </CustomButton>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4">
                <button onClick={handleCriarPedido}
                    className="w-full max-w-60 bg-red-600 hover:bg-red-700 text-white text-base font-semibold px-6 py-4 rounded-lg shadow transition"
                >
                    Finalizar Pedido
                </button>
            </div>

            {/* {status && (<SuccessDialog message={status.mensagem} />)} */}

            {status && dataRelatorio && (
                <RelatorioButton
                    ref={relatorioRef}
                    pedidoData={dataRelatorio}
                    templateName="pedido-relatorio"
                    shouldReloadOnClose={true}
                />
            )}

        </div>
    );
}
