import { Comprador } from "@apimodel/payload/intefaces";
import { compradorService } from "@services/core/comprador-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const fornecedores: Array<Comprador> = await compradorService.listar();
    return NextResponse.json(fornecedores);
}