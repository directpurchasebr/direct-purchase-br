import { NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Comprador } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const GET = withErrorHandling(async () => {
    const fornecedores: Array<Comprador> = await coreService.comprador.listar();
    return NextResponse.json(fornecedores);
});