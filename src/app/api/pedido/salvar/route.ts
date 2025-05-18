import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Status } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const data = await request.json();
    const status = await await coreService.pedido.salvar(data) as Status | null | never[];
    if (!status) {
        return NextResponse.json({ error: 'Pedido não encontrado' });
    }
    return NextResponse.json(status);
});