export interface Produto {
    codigo: string;
    descricao: string;
    marca: string;
    unidade: string;
    preco: number;
    fornecedor: Fornecedor;
}

export interface Fornecedor {
    fornecedorId: number;
    codigo: string;
    nome: string
}

export interface Comprador {
    compradorId: number;
    negocioId: number;
    codigo: string;
    nome: string
}