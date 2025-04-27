import axios from 'axios';

interface JsReportData {
    templateContent: string;
    data: any;
}

const baseUrl = process.env.JSREPORT_URL || 'http://localhost:5488';
const username = process.env.JSREPORT_USERNAME || '';
const password = process.env.JSREPORT_PASSWORD || '';

export default async function generatePdf({ templateContent, data }: JsReportData): Promise<Buffer> {
    try {
        const response = await axios.post(
            `${baseUrl}/api/report`,
            {
                template: {
                    content: templateContent,
                    engine: 'handlebars',
                    recipe: 'chrome-pdf',
                },
                data: data,
            },
            {
                responseType: 'arraybuffer',
                auth: {
                    username: username,
                    password: password,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Erro ao gerar PDF com jsreport:', error.response?.data || error.message);
        throw new Error('Erro ao gerar PDF');
    }
}

