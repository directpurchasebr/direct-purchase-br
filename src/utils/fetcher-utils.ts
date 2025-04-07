export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: HeadersInit;
}

export default async function fetcherUtils<T>(
    url: string,
    method: string,
    body?: any | null,
    options?: RequestInit & { token?: string, sessionId?: string }
): Promise<T> {
    const { token, sessionId, ...rest } = options || {};
    const backendUrl = process.env.BACKEND_URL || '';

    try {
        const res = await fetch(`${backendUrl}${url}`, {
            ...rest,
            method,
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(sessionId && { 'x-session-id': sessionId }),
                ...rest.headers,
            },
            ...(body && { body: JSON.stringify(body) }),
        });

        const contentType = res.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        if (!res.ok) {
            const errorData = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);
            const message = errorData?.message || res.statusText || 'Erro desconhecido';
            throw new Error(`Erro ${res.status}: ${message}`);
        }

        return isJson ? res.json() : ({} as T);
    } catch (error: any) {
        console.error(`Erro ao acessar ${method} ${url}:`, error);
        throw new Error(error.message || 'Erro inesperado ao fazer requisição');
    }
}