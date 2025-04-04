

export async function HttpUtils(url: string, fetchOptions: any) {
    const options = {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        },
        body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
    };
    return fetch(url, options)
        .then(async (resp) => {
            return {
                ok: resp.ok,
                status: resp.status,
                statusText: resp.statusText,
                body: await resp.json(),
            }
        });
}

export default HttpUtils