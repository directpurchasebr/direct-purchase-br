import { Pedido } from "@apimodel/payload/intefaces";
import { coreService } from "@services/core-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const pedidos: Array<Pedido> = await coreService.pedido.listar();
    return NextResponse.json(pedidos);
}