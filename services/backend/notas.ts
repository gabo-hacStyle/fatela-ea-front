'use server';
import { Note, NotesByCountry, InitialInfo } from "@/index";

import { BASE_URL } from "./url";
const BASE_GRADES = `${BASE_URL}/grades`;

//get all notes
export const getNotes = async (token: string) => {
    try {
        const response = await fetch(`${BASE_GRADES}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as Note[];
    } catch (error) {
        throw new Error(`Failed to get notes: ${error}`);
    }
}

export const getInitialInfo = async(token: string) => {
    try {
        const response = await fetch(`${BASE_GRADES}/infoQuantities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as InitialInfo;
    } catch (error) {
        throw new Error(`Failed to get notes: ${error}`);
    }
}

export const getFilteredNotes = async(token: string, query: string) => {
    try {
        const response = await fetch(`${BASE_GRADES}/filteredBy${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as Note[];
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