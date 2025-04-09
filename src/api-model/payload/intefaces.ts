export interface Status {
    status: boolean;
    mensagem: string;
    erro: string;
    body: any;
}

export interface Usuario {
    nome: string;
    email: string;
    login: string;
    indEstoque: boolean;
    dataNascimento: string;
    perfil: Perfil;
    fornecedores: Array<Fornecedor>;
    compradores: Array<Comprador>;
    senha?: string;
}

export interface Perfil {
    perfilId: number;
    descricao: string;
}


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