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

    const response = await fetch(`${backendUrl}${url}`, {
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

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar a requisição.');
    }

    return isJson ? response.json() : ({} as T);
}