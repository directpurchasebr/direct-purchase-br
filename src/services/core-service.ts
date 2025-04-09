
import fetcherUtils from '@utils/fetcher-utils';
import { Comprador, Fornecedor, Perfil, Produto, Status, Usuario } from '@apimodel/payload/intefaces';
import { getUserFromSession } from '@utils/session-utils';
import { apiRoutes } from '@lib/api-routers';
import { UsuarioLogado } from '@apimodel/auth/interfaces';
import { Credentials } from 'next-auth';

async function fetchWithToken<T>(
    route: string,
    token?: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    isAuth: boolean = false
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
            const data = await fetchWithToken<UsuarioLogado>(apiRoutes.auth.login, undefined, 'POST', credentials, true);
            return data ?? null;
        },
    },

    comprador: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Comprador>>(apiRoutes.comprador.compradores, token);
            return data ?? [];
        },
    },

    fornecedor: {
        listar: async (token?: string) => {
            const data = await fetchWithToken<Array<Fornecedor>>(apiRoutes.fornecedor.fornecedores, token);
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
};
