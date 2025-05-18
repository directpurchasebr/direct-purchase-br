import { Status } from "@apimodel/payload/intefaces";
import { coreService } from "@services/core-service";
import { NextResponse } from "next/server";

export async function GET() {
    const status = await coreService.auth.validateToken() as Status | null | never[];
    if (!status) {
        return NextResponse.json({ error: 'Erro ao validar login' });
    }
    return NextResponse.json(status);
}