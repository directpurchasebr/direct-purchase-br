import { withErrorHandling } from '@/utils/api-handler'
import { NextResponse } from 'next/server'
import { coreService } from '@/services/core-service'

export const GET = withErrorHandling(async () => {
    const pedidos = await coreService.pedido.listar()
    return NextResponse.json(pedidos)
});