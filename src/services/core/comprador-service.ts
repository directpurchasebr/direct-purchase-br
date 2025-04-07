import fetcherUtils from '@utils/fetcher-utils';
import { Comprador } from '@apimodel/payload/intefaces'
import { getUserFromSession } from '@lib/user-session';
import { apiRoutes } from '@lib/api-routers';

export const compradorService = {
    listar: async (token?: string) => {
        if (!token) {
            const userSession = await getUserFromSession();
            const tokenServer = userSession ? userSession.accessToken : null;
            if (tokenServer) token = tokenServer;
        }

        if (token) {
            return await fetcherUtils<Array<Comprador>>(
                apiRoutes.comprador.compradores, 'GET', null, { token: token });
        } else {
            return Array<Comprador>();
        }
    },
};