import { NextRequest, NextResponse } from "next/server";
import { Produto } from "@apimodel/payload/intefaces";
import { produtoService } from "@services/core/produto-service";

export async function GET(request: NextRequest) {
    const produtos: Array<Produto> = await produtoService.listar();
    return NextResponse.json(produtos);
}