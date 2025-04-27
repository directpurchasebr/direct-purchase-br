export const apiRoutes = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
    },
    produtos: {
        produtos: "/produto/listar",
        search: (descricao: string) => `/produto/buscar/${descricao}`,
        importar: '/produto/importaProdutosExcel'
    },
    fornecedor: {
        fornecedores: "/fornecedor/listar",
    },
    comprador: {
        compradores: "/comprador/listar",
    },
    usuario: {
        salvar: "/usuario/salvar",
        get: "/usuario/get",
    },
    perfil: {
        listar: "/perfil/listar",
    },
    pedido: {
        pedidos: "/pedido/listar",
        salvar: "/pedido/salvar",
    },
};