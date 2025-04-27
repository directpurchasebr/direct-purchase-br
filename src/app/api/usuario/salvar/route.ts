import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Status } from "@apimodel/payload/intefaces";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const status: Status | null | never[] = await coreService.usuario.salvar(data);
    if (!status) {
        return NextResponse.json({ error: 'Usuário não encontrado' });
    }
    return NextResponse.json(status);
}