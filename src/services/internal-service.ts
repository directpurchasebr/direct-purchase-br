
import { Comprador, Fornecedor, Perfil, Produto, Usuario } from "@apimodel/payload/intefaces";
import { internalRoutes } from "@lib/internal-routes";

async function fetchInternal<T>(route: string): Promise<T | undefined> {
    try {
        const res = await fetch(route);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data = await res.json();
        return data as T;
    } catch (e) {
        console.error("Erro na requisição interna:", e);
    }
}

export const internalService = {
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
