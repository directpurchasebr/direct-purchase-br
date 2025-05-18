import { NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Produto } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async () => {
    const produtos: Array<Produto> = await coreService.produto.listar();
    return NextResponse.json(produtos);
});