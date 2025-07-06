import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Produto } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const data = await request.json();
    const produtos: Array<Produto> | null | never[] = await coreService.produto.buscar(data);
    if (!produtos) {
        return NextResponse.json({ error: 'Produtos não encontrado' });
    }
    return NextResponse.json(produtos);
});