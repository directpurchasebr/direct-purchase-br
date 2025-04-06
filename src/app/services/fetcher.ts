// app/services/fetcher.ts

export async function fetcher<T>(
    url: string,
    options?: RequestInit & { token?: string, sessionId?: string }
): Promise<T> {
    const { token, sessionId, ...rest } = options || {};
    const backendUrl = process.env.BACKEND_URL || '';

    const res = await fetch(`${backendUrl}${url}`, {
        ...rest,
        //mode: 'no-cors',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(sessionId && { "x-session-id": sessionId }),
            ...rest.headers,
        },
    });

    if (!res.ok) {
        //const error = await res.json();
        throw new Error('Erro na requisição');
    }

    return res.json();
}

export default fetcher;  