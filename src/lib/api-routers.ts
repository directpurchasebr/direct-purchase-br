export const apiRoutes = {
    auth: {
        login: "/auth/login",
    },
    produtos: {
        produtos: "/produto/listar",
        search: (descricao: string) => `/produto/buscar/${descricao}`,
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
};