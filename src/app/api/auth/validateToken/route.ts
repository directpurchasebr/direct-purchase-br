import { Status } from "@apimodel/payload/intefaces";
import { coreService } from "@services/core-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const status: Status | null | never[] = await coreService.auth.validateToken();
    if (!status) {
        return NextResponse.json({ error: 'Erro ao validar login'});
    }
    return NextResponse.json(status);
}