import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Fornecedor } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async (request: NextRequest) => {
    const fornecedores: Array<Fornecedor> = await coreService.fornecedor.listar();
    return NextResponse.json(fornecedores);
});