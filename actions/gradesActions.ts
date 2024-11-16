'use server';
import { Note, NotesByCountry, NotesPaginationResponse, QuantityInfo } from "@/index";
import { getFilteredNotes, getQuantityInfo } from "@/services/backend/notas";
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
            // console.log('response', response);
            return response as QuantityInfo;
        } else {
            throw new Error('Token not found');
        }

        
    } catch (error: any) {
        console.error(`Failed to get quantity info: ${error.message}`);
    }
}

export const handleGetGradesFiltered = async (query: string | null) => {
    try {
        console.log('query', query);
        const token = await bringToken();
        if(token) {
            const response = await getFilteredNotes(token, query);
            return response as NotesPaginationResponse;
        } else {
            throw new Error('Token not found');
        }
    } catch (error: any) {
        console.error(`Failed to get quantity info: ${error.message}`);
    }
}