import { NextResponse } from 'next/server';
import { coreService } from '@services/core-service';
import { Produto } from '@apimodel/payload/intefaces';
import { withErrorHandling } from '@utils/api-handler';

export const GET = (async (...args: any[]) => {
    return await withErrorHandling(async (...args: any[]) => {
        const [, { params }] = args;
        const { desc } = params;
        const produtos: Array<Produto> = await coreService.produto.search(desc);
        return NextResponse.json(produtos);
    })(...args);
}) as any;