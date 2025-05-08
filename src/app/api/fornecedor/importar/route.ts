
import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Status } from "@apimodel/payload/intefaces";
import { withErrorHandling } from "@utils/api-handler";

export const POST = withErrorHandling(async (request: NextRequest) => {
    const data = await request.formData();
    const status: Status | null | never[] = await coreService.fornecedor.import(data);
    if (!status) {
        return NextResponse.json({ error: 'Erro ao importar excel' });
    }
    return NextResponse.json(status);
});