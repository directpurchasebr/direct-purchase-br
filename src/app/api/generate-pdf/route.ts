import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import generatePdf from '@utils/jsReport-utils';

export async function POST(request: NextRequest) {
    try {
        const { templateName, data } = await request.json();
        if (!templateName) {
            return new Response('Nome do template é necessário', { status: 400 });
        }

        const templatePath = path.join(process.cwd(), 'src', 'report', 'data', 'templates', `${templateName}.handlebars`);
        if (!fs.existsSync(templatePath)) {
            return new Response('Template não encontrado', { status: 404 });
        }

        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const jsreportResponse = await generatePdf({
            templateContent,
            data,
        });

        return new Response(jsreportResponse, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
            },
        });
    } catch (error: any) {
        console.error('Erro ao gerar PDF:', error.response?.data || error.message);
        return new Response('Erro ao gerar PDF', { status: 500 });
    }
}
