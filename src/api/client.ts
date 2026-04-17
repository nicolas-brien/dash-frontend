import { ApiException } from './errors';
import { tokenStorage } from './token';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5294';

interface RequestOptions extends RequestInit {
    auth?: boolean;
}

export async function auth<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const token = tokenStorage.get();
    const res = await fetch(`${BASE_URL}/auth${path}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        },
        ...options
    });

    const isJson = res.headers
        .get('content-type')
        ?.includes('application/json');

    const body = isJson ? await res.json() : null;

    if (!res.ok) {
        if (res.status === 401) {
            tokenStorage.clear();
            window.location.href = '/login';
            return Promise.reject(new ApiException({
                status: res.status,
                message: 'Unauthorized',
            }));
        }
        throw new ApiException({
            status: res.status,
            message: body?.message || 'Unexpected error',
            fieldErrors: body?.errors
        });
    }

    return body as T;
}

export async function api<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const token = tokenStorage.get();
    const res = await fetch(`${BASE_URL}/api${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        },
        ...options
    });

    const isJson = res.headers
        .get('content-type')
        ?.includes('application/json');

    const body = isJson ? await res.json() : null;

    if (!res.ok) {
        throw new ApiException({
            status: res.status,
            message: body?.message || 'Unexpected error',
            fieldErrors: body?.errors
        });
    }

    return body as T;
}