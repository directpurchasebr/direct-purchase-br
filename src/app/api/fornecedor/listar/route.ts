import { NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Fornecedor } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async () => {
    const fornecedores: Array<Fornecedor> = await coreService.fornecedor.listar();
    return NextResponse.json(fornecedores);
});