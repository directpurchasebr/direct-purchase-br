import fetcher from '@app/services/fetcher';
import { Produto } from '@apimodel/produto/intefaces'
import { Usuario } from '@apimodel/auth/interfaces';
import { headers } from 'next/headers';
import { getUserFromSession } from '@lib/user-session';

export const produtoService = {
    listar: async () => {
        const userSession = await getUserFromSession();
        const token = userSession ? userSession.accessToken : null;

        if (token) {
            return await fetcher<Array<Produto>>('/api/produto/listar', { token: token });
        } else {
            return Array<Produto>();
        }
    },
    search: async (desc: string) => {

        const userSession = await getUserFromSession();
        const token = userSession ? userSession.accessToken : null;

        if (token) {
            return await fetcher<Array<Produto>>(`/api/produto/buscar/${desc}`, { token: token });
        } else {
            return Array<Produto>();
        }
    },
};