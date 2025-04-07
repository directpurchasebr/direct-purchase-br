export const internalRoutes = {
  produtos: {
    produtos: "/api/produto/listar",
    buscar: (descricao: string) => `/api/produto/buscar/${descricao}`,
  },
  fornecedor: {
    fornecedores: "/api/fornecedor/listar",
  },
  comprador: {
    compradores: "/api/comprador/listar",
  },
};