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
    produtoId: number;
    codigo: string;
    descricao: string;
    descOriginal: string;
    marca: string;
    unidade: string;
    preco: number;
    fornecedor: Fornecedor;
}

export interface Fornecedor extends Pessoa {
    fornecedorId: number;
    layoutExcel: string;
}

export interface Comprador extends Pessoa {
    compradorId: number;
}

export interface ConsultaPedido {
    codigoPedido: string;
    dataPedido: string;
    compradorId: number;
}

export interface Pedido {
    pedidoId: number;
    codigoPedido: string;
    dataPedido: string;
    comprador: Comprador;
    produtos: Array<PedidoProduto>;
    valorTotal: number;
    observacao: string;
    status: string;
}

export interface PedidoProduto {
    pedidoProdutoId: number;
    id: number;
    fornecedor: Fornecedor;
    codigo: string;
    produto: Produto;
    quantidade: number;
    unidade: string;
    preco: number;
    precoTotal: number;
}

export interface Pessoa {
    pessoaId: number;
    negocioId: number;
    codigo: string;
    nome: string;
    nomeFantasia: string;
    cpf: string;
    cnpj: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    telefone: string;
    email: string;
    site: string;
    responsavel: string;
    telefoneResponsavel: string;
    observacoes: string;
    enderecos: Array<PessoaEndereco>;
    bancos: Array<PessoaBanco>;
}

export interface PessoaEndereco {
    pessoaEnderecoId: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

export interface PessoaBanco {
    pessoaBancoId: number;
    banco: string;
    agencia: string;
    conta: string;
    tipoConta: string;
    titular: string;
    cnpjTitular: string;
}

export interface ProdutosExcel {
    fornecedorId: number;
    file: File;
}
