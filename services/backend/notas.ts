'use server';
import { NotesByCountry, NotesPaginationResponse, QuantityInfo, StudentsByYearResponse } from "@/index";

import { BASE_URL } from "./url";
const BASE_GRADES = `${BASE_URL}/grades`;

//get all notes
// export const getNotes = async (token: string) => {
//     try {
//         const response = await fetch(`${BASE_GRADES}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             cache: 'default'
//         });
//         const data = await response.json();
//         return data as Note[];
//     } catch (error) {
//         throw new Error(`Failed to get notes: ${error}`);
//     }
// }

export const getQuantityInfo = async(token: string, query: string ) => {
    try {
        // const queryReal = query ? query : '';
        // console.log('query para cantidades', query);
        const response = await fetch(`${BASE_GRADES}/infoQuantities${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        console.log('data de quaintities:',data)
        return data as QuantityInfo;
    } catch (error) {
        throw new Error(`Failed to get notes: ${error}`);
    }
}

export const getFilteredNotes = async(token: string, query: string) => {
    try {
        // const queryReal = query ? query : '';
        // console.log('query para filteredNotes', query);
        const response = await fetch(`${BASE_GRADES}/filteredBy${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as NotesPaginationResponse;
    } catch (error) {
        throw new Error(`Failed to get notes: ${error}`);
    }
}

export const getNotesByCountry = async(token: string, countryId: number) => {
    try {
        const response = await fetch(`${BASE_GRADES}/country/${countryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as NotesByCountry;
    } catch (error) {
        throw new Error(`Failed to get notes: ${error}`);
    }
}

// export const getStudentsByYear = async(token: string, countryId: number | null) => {
//     try {
//         console.log('Llegando aca')
//         const queery = countryId ? `?countryId=${countryId}` : '';
//         const response = await fetch(`${BASE_GRADES}/studentsByTime${queery}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             cache: 'default'
//         });
//         const data = await response.json();
        
//         return data as StudentsByYearResponse[];
//     } catch (error) {
//         throw new Error(`Failed to get notes: ${error}`);
//     }
// }