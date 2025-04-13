
import { Comprador, Fornecedor, Perfil, Produto, Status, Usuario } from "@apimodel/payload/intefaces";
import { internalRoutes } from "@lib/internal-routes";

async function fetchInternal<T>(
    route: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<T | undefined> {

    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(route, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar a requisição.');
    }

    const data = await response.json();
    return data as T;
}

export const internalService = {
    auth: {
        logout: async (token?: string) => {
            return await fetchInternal<Status>(internalRoutes.auth.logout);
        },
    },

    comprador: {
        listar: async () => {
            return await fetchInternal<Array<Comprador>>(internalRoutes.comprador.listar);
        },
    },

    fornecedor: {
        listar: async () => {
            return await fetchInternal<Array<Fornecedor>>(internalRoutes.fornecedor.listar);
        }
    },

    produto: {
        buscar: async (desc: string) => {
            if (desc.trim().length === 0) return;
            return await fetchInternal<Array<Produto>>(internalRoutes.produto.buscar(encodeURIComponent(desc)));
        },
    },

    usuario: {
        salvar: async (body: Usuario) => {
            return await fetchInternal<Status>(internalRoutes.usuario.salvar, 'POST', body);
        },

        get: async () => {
            return await fetchInternal<Usuario>(internalRoutes.usuario.get);
        }
    },

    perfil: {
        listar: async () => {
            return await fetchInternal<Array<Perfil>>(internalRoutes.perfil.listar);
        }
    }

};
