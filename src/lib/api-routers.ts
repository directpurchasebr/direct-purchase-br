export const apiRoutes = {
    auth: {
        login: "/auth/login",
        logout: "/auth/logout",
        validateToken: "/auth/validateToken",
    },
    produtos: {
        produtos: "/produto/listar",
        search: (descricao: string) => `/produto/buscar/${descricao}`,
        salvar: "/produto/salvar",
    },
    fornecedor: {
        fornecedores: "/fornecedor/listar",
        importar: '/fornecedor/importaExcel',
        salvar: "/fornecedor/salvar",
    },
    comprador: {
        compradores: "/comprador/listar",
        salvar: "/comprador/salvar",
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