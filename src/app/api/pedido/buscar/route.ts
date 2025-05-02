import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Pedido } from "@apimodel/payload/intefaces";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const pedidos: Array<Pedido> | null | never[] = await coreService.pedido.buscar(data);
    if (!pedidos) {
        return NextResponse.json({ error: 'Pedidos não encontrado' });
    }
    return NextResponse.json(pedidos);
}