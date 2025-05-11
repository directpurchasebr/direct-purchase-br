export const internalRoutes = {
  auth: {
    logout: "/api/auth/logout",
  },
  produto: {
    listar: "/api/produto/listar",
    buscar: (descricao: string) => `/api/produto/buscar/${descricao}`,
    salvar: "/api/produto/salvar",
  },
  fornecedor: {
    listar: "/api/fornecedor/listar",
    importar: '/api/fornecedor/importar',
    salvar: "/api/fornecedor/salvar",
  },
  comprador: {
    listar: "/api/comprador/listar",
    salvar: "/api/comprador/salvar",
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