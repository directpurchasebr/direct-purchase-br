export const routes = {
  produtos: {
    produtos: "/api/produto/listar",
    search: (descricao: string) => `/api/produto/buscar/${descricao}`,
  },
  auth: {
    login: "/api/auth/login",
  },
};