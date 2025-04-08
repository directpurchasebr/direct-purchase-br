import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Produto } from "@apimodel/payload/intefaces";

export async function GET(request: NextRequest) {
    const produtos: Array<Produto> = await coreService.produto.listar();
    return NextResponse.json(produtos);
}