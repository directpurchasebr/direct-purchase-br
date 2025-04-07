export const apiRoutes = {
    produtos: {
        produtos: "/api/produto/listar",
        search: (descricao: string) => `/api/produto/buscar/${descricao}`,
    },
    fornecedor: {
        fornecedores: "/api/fornecedor/listar",
    },
    comprador: {
        compradores: "/api/comprador/listar",
    },
    auth: {
        login: "/api/auth/login",
    },
};