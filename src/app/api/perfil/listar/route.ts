import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Perfil, Produto } from "@apimodel/payload/intefaces";

export async function GET(request: NextRequest) {
    const perfils: Array<Perfil> = await coreService.perfil.listar();
    return NextResponse.json(perfils);
}