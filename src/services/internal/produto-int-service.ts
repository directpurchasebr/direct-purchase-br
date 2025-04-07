import { internalRoutes } from "@lib/internal-routes";

export const produtoIntService = {

    buscar: async (desc: string) => {
        if (desc.trim().length === 0) return;
        try {
            const res = await fetch(internalRoutes.produtos.buscar(encodeURIComponent(desc)));
            if (!res.ok) throw new Error("Erro ao buscar produtos");
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Erro na busca de produtos:", e);
        }
    },
};