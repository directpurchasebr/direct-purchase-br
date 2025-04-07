import fetcherUtils from '@utils/fetcher-utils';
import { Fornecedor } from '@apimodel/payload/intefaces'
import { getUserFromSession } from '@lib/user-session';
import { apiRoutes } from '@lib/api-routers';

export const fornecedorService = {
    listar: async (token?: string) => {
        if (!token) {
            const userSession = await getUserFromSession();
            const tokenServer = userSession ? userSession.accessToken : null;
            if (tokenServer) token = tokenServer;
        }

        if (token) {
            return await fetcherUtils<Array<Fornecedor>>(
                apiRoutes.fornecedor.fornecedores, 'GET', null, { token: token });
        } else {
            return Array<Fornecedor>();
        }
    },
};