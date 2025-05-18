import { NextResponse } from 'next/server';
import { coreService } from '@services/core-service';
import { Produto } from '@apimodel/payload/intefaces';
import { withErrorHandling } from '@utils/api-handler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = (async (...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await withErrorHandling(async (...args: any[]) => {
        const [, { params }] = args;
        const { desc } = params;
        const produtos: Array<Produto> = await coreService.produto.search(desc);
        return NextResponse.json(produtos);
    })(...args);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as any;



// export async function GET({ params }: { params: { desc: string } }) {
//     const { desc } = params;
//     const produtos: Array<Produto> = await coreService.produto.search(desc);
//     return NextResponse.json(produtos);
// }