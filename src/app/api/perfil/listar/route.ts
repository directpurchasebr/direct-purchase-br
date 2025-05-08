import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Perfil } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async (request: NextRequest) => {
    const perfils: Array<Perfil> = await coreService.perfil.listar();
    return NextResponse.json(perfils);
});