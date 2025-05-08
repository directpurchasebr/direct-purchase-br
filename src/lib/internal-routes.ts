export const internalRoutes = {
  auth: {
    logout: "/api/auth/logout",
  },
  produto: {
    listar: "/api/produto/listar",
    buscar: (descricao: string) => `/api/produto/buscar/${descricao}`,
  },
  fornecedor: {
    listar: "/api/fornecedor/listar",
    importar: '/api/fornecedor/importar',
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
    buscar: "/api/pedido/buscar",
  },
};