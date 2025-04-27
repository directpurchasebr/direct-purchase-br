export const internalRoutes = {
  auth: {
    logout: "/api/auth/logout",
  },
  produto: {
    listar: "/api/produto/listar",
    buscar: (descricao: string) => `/api/produto/buscar/${descricao}`,
    importar: '/api/produto/importar'
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
  pedido: {
    listar: "/api/pedido/listar",
    salvar: "/api/pedido/salvar",
  },
};