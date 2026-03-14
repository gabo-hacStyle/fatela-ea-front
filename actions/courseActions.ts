'use server'
import { getCourses, getCoursesByYear } from "@/services/backend/cursos";
import { CoursesByYear } from "index";
import { getCookie } from "@/utils/cookiesManager";

//Token cookie
const bringToken = async () => {
    const token = await getCookie('token');
    return token;
}

export const handleGetCourses = async (query: string | null) => {
    try {
        const token = await bringToken();
        if(token) {
            const response = await getCourses(token, query);
            
            return response;
           
        }
        
    } catch (error: any) {
        console.error(`Failed to get courses: ${error.message}`);
    }
}

export const handleGetCoursesByYear = async (year: number) => {
    try {
        const token = await bringToken();
        if(token) {
            const response = await getCoursesByYear(token, year);
            return response as CoursesByYear[];
        }

    }
    catch (error: any) {
        console.error(`Failed to get courses: ${error.message}`);
    }
}