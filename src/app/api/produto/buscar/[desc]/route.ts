import { NextRequest, NextResponse } from 'next/server';
import { coreService } from '@services/core-service';
import { Produto } from '@apimodel/payload/intefaces';
import { withErrorHandling } from '@utils/api-handler';

export const GET = withErrorHandling(async (request: NextRequest, context: { params: { desc: string } }) => {
    const { desc } = await context.params;
    const produtos: Array<Produto> = await coreService.produto.search(desc);
    return NextResponse.json(produtos);
});