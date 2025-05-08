import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Pedido } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const data = await request.json();
    const pedidos: Array<Pedido> | null | never[] = await coreService.pedido.buscar(data);
    if (!pedidos) {
        return NextResponse.json({ error: 'Pedidos não encontrado' });
    }
    return NextResponse.json(pedidos);
});