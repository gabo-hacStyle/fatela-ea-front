'use server';
import { cookies } from "next/headers";
import { Locale, defaultLocale } from '@/i18n/config';

export const setCookie = async (key: string, value: string) => {
    const cookiesStore = await cookies();


    if (key === 'token') {
        cookiesStore.set(key, value, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            path: '/',
            sameSite: 'strict'
        });
    } else {
        cookiesStore.set(key, value);
    }
};

export async function setUserLocale(locale: Locale) {
    const cookiesStore = await cookies();
    cookiesStore.set('NEXT_LOCALE', locale);
}

export async function getUserLocale() {
    const cookiesStore = await cookies();
    return cookiesStore.get('NEXT_LOCALE')?.value || defaultLocale;
}

export const getCookie = async (key: string) => {
    const cookiesStore = await cookies();
    return cookiesStore.get(key)?.value;
};

export const deleteCookie = async (key: string) => {
    const cookiesStore = await cookies();
    cookiesStore.delete(key);
};