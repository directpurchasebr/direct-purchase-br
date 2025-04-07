import { Fornecedor } from "@apimodel/payload/intefaces";
import { fornecedorService } from "@services/core/fornecedor-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const fornecedores: Array<Fornecedor> = await fornecedorService.listar();
    return NextResponse.json(fornecedores);
}