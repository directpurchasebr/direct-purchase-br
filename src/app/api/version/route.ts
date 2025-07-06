import { NextResponse } from "next/server";
import { getAppVersion } from "@/lib/app-version";

export async function GET() {
    const version = getAppVersion();
    return NextResponse.json({ version });
}
