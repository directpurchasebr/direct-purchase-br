import { NextRequest, NextResponse } from 'next/server';
import { Produto } from '@apimodel/payload/intefaces';
import { produtoService } from '@services/core/produto-service';

export async function GET(request: NextRequest, context: { params: { desc: string } }) {
    const { desc } = await context.params;
    const produtos: Array<Produto> = await produtoService.search(desc);
    return NextResponse.json(produtos);
}