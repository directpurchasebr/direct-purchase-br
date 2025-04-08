import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Fornecedor } from "@apimodel/payload/intefaces";

export async function GET(request: NextRequest) {
    const fornecedores: Array<Fornecedor> = await coreService.fornecedor.listar();
    return NextResponse.json(fornecedores);
}