import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const saveCustomCookie = (key: string, value: any) => {
    setCookie(key, JSON.stringify(value));
};

export const getCustomCookie = (key: string) => {
    const cookie = getCookie(key);
    return cookie ? JSON.parse(cookie as string) : null;
};

export const clearCustomCookie = (key: string) => {
    deleteCookie(key);
};