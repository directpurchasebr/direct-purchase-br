import { Status } from "@apimodel/payload/intefaces";
import { coreService } from "@services/core-service";
import {  NextResponse } from "next/server";

export async function GET() {
    const status = await coreService.auth.logout() as Status | null | never[];
    if (!status) {
        return NextResponse.json({ error: 'Erro no logout' });
    }
    return NextResponse.json(status);
}