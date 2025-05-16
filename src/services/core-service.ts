
import fetcherUtils from '@utils/fetcher-utils';
import { Comprador, ConsultaPedido, Fornecedor, Pedido, Perfil, Produto, Status, Usuario } from '@apimodel/payload/intefaces';
import { getUserFromSession } from '@utils/session-utils';
import { apiRoutes } from '@lib/api-routers';
import { UsuarioLogado } from '@apimodel/auth/interfaces';
import { Credentials } from 'next-auth';

async function fetchWithToken<T>(
    route: string,
    token?: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    isAuth: boolean = false,
): Promise<T | null> {
    if (!isAuth && !token) {
        const userSession = await getUserFromSession();
        const tokenServer = userSession ? userSession.accessToken : null;
        if (tokenServer) token = tokenServer;
    }

    if (isAuth || token) {
        return await fetcherUtils<T>(route, method, body, { token });
    } else {
        return null;
    }
}

export const coreService = {
    auth: {
        login: async (credentials: Credentials) => {
            const data = await fetchWithToken<UsuarioLogado>(apiRoutes.auth.login, undefined,
                'POST', credentials, true);
            return data ?? null;
        },

        logout: async (token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.auth.logout, token);
            return data ?? [];
        },

        validateToken: async (token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.auth.validateToken, token);
            return data ?? [];
        },
    },

    comprador: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Comprador>>(apiRoutes.comprador.compradores, token);
            return data ?? [];
        },

        salvar: async (body: Comprador, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.comprador.salvar, token, 'POST', body);
            return data ?? [];
        },
    },

    fornecedor: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Fornecedor>>(apiRoutes.fornecedor.fornecedores, token);
            return data ?? [];
        },

        import: async (body: any, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.fornecedor.importar, token, 'POST', body, false);
            return data ?? [];
        },

        salvar: async (body: Fornecedor, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.fornecedor.salvar, token, 'POST', body);
            return data ?? [];
        },
    },

    produto: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Produto>>(apiRoutes.produtos.produtos, token);
            return data ?? [];
        },

        search: async (desc: string, token?: string) => {
            const data = await fetchWithToken<Array<Produto>>(apiRoutes.produtos.search(desc), token);
            return data ?? [];
        },

        salvar: async (body: Produto, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.produtos.salvar, token, 'POST', body);
            return data ?? [];
        },
    },

    usuario: {
        salvar: async (body: Usuario, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.usuario.salvar, token, 'POST', body);
            return data ?? [];
        },

        get: async (token?: string) => {
            return await fetchWithToken<Usuario>(apiRoutes.usuario.get, token);
        },
    },

    perfil: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Perfil>>(apiRoutes.perfil.listar, token);
            return data ?? [];
        },
    },

    pedido: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Pedido>>(apiRoutes.pedido.pedidos, token);
            return data ?? [];
        },

        salvar: async (body: Pedido, token?: string) => {
            const data = await fetchWithToken<Status>(apiRoutes.pedido.salvar, token, 'POST', body);
            return data ?? [];
        },

        buscar: async (body: ConsultaPedido, token?: string) => {
            const data = await fetchWithToken<Array<Pedido>>(apiRoutes.pedido.buscar, token, 'POST', body);
            return data ?? [];
        },
    },

};
