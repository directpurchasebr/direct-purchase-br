
import { Comprador, ConsultaPedido, Fornecedor, Pedido, Perfil, Produto, Status, Usuario } from "@apimodel/payload/intefaces";
import { internalRoutes } from "@lib/internal-routes";
import { signOut } from "next-auth/react";

async function fetchInternal<T>(
    route: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<T | undefined> {

    const isFormData = body instanceof FormData;
    const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };

    const options: RequestInit = {
        method,
        headers,
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    };

    const response = await fetch(route, options);

    if (response.status === 401) {
        const data = await response.json()
        if (data?.error === 'TokenExpired') {
            signOut({ callbackUrl: '/' })
        }
    }

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

        importar: async (body: any) => {
            return await fetchInternal<Status>(internalRoutes.produto.importar, 'POST', body);
        },

        listar: async () => {
            return await fetchInternal<Array<Produto>>(internalRoutes.produto.listar);
        }
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
    },

    pedido: {
        listar: async () => {
            return await fetchInternal<Array<Pedido>>(internalRoutes.pedido.listar);
        },


        salvar: async (body: Pedido) => {
            return await fetchInternal<Status>(internalRoutes.pedido.salvar, 'POST', body);
        },

        buscar: async (body: ConsultaPedido) => {
            return await fetchInternal<Array<Pedido>>(internalRoutes.pedido.buscar, 'POST', body);
        },
    },

};
