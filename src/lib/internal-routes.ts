export const internalRoutes = {
  produto: {
    listar: "/api/produto/listar",
    buscar: (descricao: string) => `/api/produto/buscar/${descricao}`,
  },
  fornecedor: {
    listar: "/api/fornecedor/listar",
  },
  comprador: {
    listar: "/api/comprador/listar",
  },
  usuario: {
    get: "/api/usuario/get",
  },
  perfil: {
    listar: "/api/perfil/listar",
  },
};