import { internalRoutes } from "@lib/internal-routes";

export const fornecedorIntService = {
    fornecedores: async () => {
        try {
            const res = await fetch(internalRoutes.fornecedor.fornecedores);
            if (!res.ok) throw new Error("Erro ao listar fornecedores");
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Erro na listar fornecedores:", e);
        }
    },
};