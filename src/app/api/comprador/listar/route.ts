import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Comprador } from "@apimodel/payload/intefaces";

export async function GET(request: NextRequest) {
    const fornecedores: Array<Comprador> = await coreService.comprador.listar();
    return NextResponse.json(fornecedores);
}