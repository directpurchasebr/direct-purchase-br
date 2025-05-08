import { withErrorHandling } from '@/utils/api-handler'
import { NextRequest, NextResponse } from 'next/server'
import { coreService } from '@/services/core-service'

export const GET = withErrorHandling(async (request: NextRequest) => {
    const pedidos = await coreService.pedido.listar()
    return NextResponse.json(pedidos)
});