'use server';
import { Note, NotesByCountry, NotesPaginationResponse, QuantityInfo } from "@/index";
import { getFilteredNotes, getQuantityInfo } from "@/services/backend/notas";
import { getCookie } from "@/utils/cookiesManager";

//Token cookie
const bringToken = async () => {
    const token = await getCookie('token');
    return token;
}

export const handleGetQuantityInfo = async(query: string | null, view: 'staff' | 'coord' | null, countryId: number | null ) => {
    try {
        
        const token = await bringToken();
        const queryReal = (!query && view === 'staff') ? ''
         : (view === 'coord' && countryId && !query) ? `countryId=${countryId}`
         : (view === 'coord' && countryId) ? `countryId=${countryId}&${query}` : query; 
        const queryToPass = `?${queryReal}`;
        // console.log('queryToPass', queryToPass);
        if(token) {


            //Se hace esta validacion para que al inicio, cuando se setean los estados globales, no se haga la peticion
            if(!view || (view === 'coord' && !countryId)) {
                console.log(' no voy a hacer fecth');
            } else {
                const response = await getQuantityInfo(token, queryToPass);
                return response as QuantityInfo;
            }
        } else {
            throw new Error('Token not found');
        }

        
    } catch (error: any) {
        console.error(`Failed to get quantity info: ${error.message}`);
    }
}

export const handleGetGradesFiltered = async (query: string | null, view: 'staff' | 'coord' | null, countryId: number | null ) => {
    try {
        console.log('query', query);
        const token = await bringToken();   
        const queryReal = (!query && view === 'staff') ? ''
         : (view === 'coord' && countryId && !query) ? `countryId=${countryId}`
         : (view === 'coord' && countryId) ? `countryId=${countryId}&${query}` : query; 
        const queryToPass = `?${queryReal}`;
        // console.log('queryToPass', queryToPass);
        if(token) {
            if(!view || (view === 'coord' && !countryId)) {
                console.log('no voy a hacer fecth');
            } else {
            const response = await getFilteredNotes(token, queryToPass);
            return response as NotesPaginationResponse;
            }
        } else {
            throw new Error('Token not found');
        }
    } catch (error: any) {
        console.error(`Failed to get quantity info: ${error.message}`);
    }
}

// export const handleGetStudentsByYear = async (countryId: number | null) => {
//     try {
//         const token = await bringToken();
//         if(token) {
//             const response = await getStudentsByYear(token, countryId);
//             return response as StudentsByYearResponse[];
//         } else {
//             throw new Error('Token not found');
//         }
//     } catch (error: any) {
//         console.error(`Failed to get quantity info: ${error.message}`);
//     }
// }