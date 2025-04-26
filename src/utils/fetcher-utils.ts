export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: HeadersInit;
}

export default async function fetcherUtils<T>(
    url: string,
    method: string,
    body?: any | null,
    options?: RequestInit & { token?: string; sessionId?: string }
): Promise<T> {
    const { token, sessionId, ...rest } = options || {};
    const backendUrl = process.env.BACKEND_URL || '';
    const isFormData = body instanceof FormData;

    const headers: HeadersInit = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(sessionId && { 'x-session-id': sessionId }),
        ...isFormData ? {} : { 'Content-Type': 'application/json' },
        ...rest.headers,
    };

    const requestInit: RequestInit = {
        ...rest,
        method,
        cache: 'no-store',
        headers,
        body: body ? isFormData ? body : JSON.stringify(body) : undefined,
    };

    const response = await fetch(`${backendUrl}${url}`, requestInit);

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!response.ok) {
        const error = isJson ? await response.json() : await response.text();
        if (error === 'Token expirado') {
            throw new Error('TOKEN_EXPIRED');
        }
        throw new Error(error);
    }

    return isJson ? response.json() : ({} as T);
}