import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Status } from "@apimodel/payload/intefaces";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const status: Status | null | never[] = await coreService.pedido.salvar(data);
    if (!status) {
        return NextResponse.json({ error: 'Pedido não encontrado' });
    }
    return NextResponse.json(status);
}