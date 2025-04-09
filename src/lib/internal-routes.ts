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
    salvar: "/api/usuario/salvar",
    get: "/api/usuario/get",
  },
  perfil: {
    listar: "/api/perfil/listar",
  },
};