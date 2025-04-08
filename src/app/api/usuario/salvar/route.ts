
import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Usuario } from "@apimodel/payload/intefaces";

export async function GET(request: NextRequest) {
    const usuario: Usuario | null = await coreService.usuario.get();
    if (!usuario) {
        return NextResponse.json({ error: 'Usuário não encontrado' });
    }
    return NextResponse.json(usuario);
}