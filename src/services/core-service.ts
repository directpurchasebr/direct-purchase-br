
import fetcherUtils from '@utils/fetcher-utils';
import { Comprador, Fornecedor, Perfil, Produto, Usuario } from '@apimodel/payload/intefaces';
import { getUserFromSession } from '@lib/user-session';
import { apiRoutes } from '@lib/api-routers';

async function fetchWithToken<T>(route: string, token?: string): Promise<T | null> {
    if (!token) {
        const userSession = await getUserFromSession();
        const tokenServer = userSession ? userSession.accessToken : null;
        if (tokenServer) token = tokenServer;
    }

    if (token) {
        return await fetcherUtils<T>(route, 'GET', null, { token });
    } else {
        return null;
    }
}

export const coreService = {
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
