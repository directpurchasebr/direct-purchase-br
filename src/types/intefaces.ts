import { Fornecedor, Produto } from "@apimodel/payload/intefaces";

export type LinhaTabela = {
    id: number;
    fornecedor: Fornecedor;
    codigo: string;
    produto: Produto;
    quantidade: number;
    unidade: string;
    preco: number;
    precoTotal: number;
};

export interface FieldConfig {
    label: string;
    value: string;
    render?: (item: any) => React.ReactNode;
    width?: string;
    fontSize?: 'sm' | 'xs';
}