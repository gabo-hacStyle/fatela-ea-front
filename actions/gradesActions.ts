'use server';
import { Note, NotesByCountry, QuantityInfo } from "@/index";
import { getQuantityInfo } from "@/services/backend/notas";
import { getCookie } from "@/utils/cookiesManager";

//Token cookie
const bringToken = async () => {
    const token = await getCookie('token');
    return token;
}

export const handleGetQuantityInfo = async(query: string | null) => {
    try {
        const token = await bringToken();
        if(token) {
            const response = await getQuantityInfo(token, query);
            return response as QuantityInfo;
        } else {
            throw new Error('Token not found');
        }

        
    } catch (error) {
        throw new Error(`Failed to get quantity info: ${error}`);
    }
}