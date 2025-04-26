
import { NextRequest, NextResponse } from "next/server";
import { coreService } from "@services/core-service";
import { Status } from "@apimodel/payload/intefaces";

export async function POST(request: NextRequest) {

    const data = await request.formData();
    const status: Status | null | never[] = await coreService.produto.import(data);
    if (!status) {
        return NextResponse.json({ error: 'Erro ao importar excel' });
    }
    return NextResponse.json(status);
}