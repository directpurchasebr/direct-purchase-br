import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { templateName, data } = await req.json();

        const templatePath = path.resolve(process.cwd(), 'src/report/data/templates', `${templateName}.handlebars`);
        const templateSource = fs.readFileSync(templatePath, 'utf-8');

        // Compilar com Handlebars
        const template = handlebars.compile(templateSource);
        const html = template(data);

        // Gerar PDF com Puppeteer
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename=relatorio.pdf'
            }
        });
    } catch (error) {
        console.error('[PDF ERROR]', error);
        return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 });
    }
}