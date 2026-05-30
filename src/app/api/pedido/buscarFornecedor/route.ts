import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { PedidoFornecedor } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const data = await request.json();
    const pedidos: Array<PedidoFornecedor> | null | never[] = await coreService.pedido.buscarFornecedor(data);
    if (!pedidos) {
        return NextResponse.json({ error: 'Pedidos não encontrado' });
    }
    return NextResponse.json(pedidos);
});