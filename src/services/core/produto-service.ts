import fetcherUtils from '@utils/fetcher-utils';
import { Produto } from '@apimodel/payload/intefaces'
import { getUserFromSession } from '@lib/user-session';
import { apiRoutes } from '@lib/api-routers';

export const produtoService = {
    listar: async (token?: string) => {
        if (!token) {
            const userSession = await getUserFromSession();
            const tokenServer = userSession ? userSession.accessToken : null;
            if (tokenServer) token = tokenServer;
        }

        if (token) {
            return await fetcherUtils<Array<Produto>>(
                apiRoutes.produtos.produtos, 'GET', null, { token: token });
        } else {
            return Array<Produto>();
        }
    },
    search: async (desc: string, token?: string) => {
        if (!token) {
            const userSession = await getUserFromSession();
            const tokenServer = userSession ? userSession.accessToken : null;
            if (tokenServer) token = tokenServer;
        }

        if (token) {
            return await fetcherUtils<Array<Produto>>(
                apiRoutes.produtos.search(desc), 'GET', null, { token: token });
        } else {
            return Array<Produto>();
        }
    },
};