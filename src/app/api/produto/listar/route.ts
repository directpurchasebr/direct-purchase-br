import { NextRequest, NextResponse } from "next/server";

import { Produto } from "@apimodel/produto/intefaces";
import { produtoService } from "@app/api/server/produto-service";

export async function GET(request: NextRequest) {
    const produtos: Array<Produto> = await produtoService.listar();
    return NextResponse.json(produtos);
}