import { internalRoutes } from "@lib/internal-routes";

export const compradorIntService = {
    compradores: async () => {
        try {
            const res = await fetch(internalRoutes.comprador.compradores);
            if (!res.ok) throw new Error("Erro ao listar compradores");
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Erro na listar compradores:", e);
        }
    },
};