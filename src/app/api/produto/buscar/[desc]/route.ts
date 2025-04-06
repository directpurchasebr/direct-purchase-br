import { NextRequest, NextResponse } from 'next/server';

import { Produto } from '@apimodel/produto/intefaces';
import { produtoService } from '@app/api/server/produto-service';

export async function GET(request: NextRequest, { params }: { params: { descricao: string } }) {
    const descricao = params.descricao;
    const produtos: Array<Produto> = await produtoService.search(descricao);
    return NextResponse.json(produtos);
}