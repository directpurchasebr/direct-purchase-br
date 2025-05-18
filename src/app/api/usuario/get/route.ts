import { NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Usuario } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async () => {
    const usuario: Usuario | null = await coreService.usuario.get();
    if (!usuario) {
        return NextResponse.json({ error: 'Usuário não encontrado' });
    }
    return NextResponse.json(usuario);
});