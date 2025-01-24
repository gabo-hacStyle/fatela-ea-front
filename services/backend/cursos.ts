import { BASE_URL } from "./url";
const BASE_GRADES = `${BASE_URL}/courses`;

import {MenuCourseResponse, MenuCourse} from 'index';

export const getCourses = async (token: string, query: string | null) => {
    try {

        const url = query ? `${BASE_GRADES}${query}` : BASE_GRADES;
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json() as MenuCourseResponse;
        return data.content as MenuCourse[];
    } catch (error) {
        throw new Error(`Failed to get courses: ${error}`);
    }
}

export const getCoursesByYear = async (token: string, year: number) => {
    try {
        const response = await fetch(`${BASE_GRADES}/year/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as MenuCourse[];
    } catch (error) {
        throw new Error(`Failed to get courses: ${error}`);
    }
}