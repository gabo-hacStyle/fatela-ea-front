'use server';
import { setCookie } from "@/utils/cookiesManager";

export const handleChangeLocale = async (locale: string) => {
    return await setCookie('NEXT_LOCALE', locale);
    
}
        