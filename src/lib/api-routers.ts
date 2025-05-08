export const apiRoutes = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
    },
    produtos: {
        produtos: "/produto/listar",
        search: (descricao: string) => `/produto/buscar/${descricao}`,
    },
    fornecedor: {
        fornecedores: "/fornecedor/listar",
        importar: '/fornecedor/importaExcel',
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
        buscar: "/pedido/buscar",
    },
};