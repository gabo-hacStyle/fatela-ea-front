'use server';
import { Country, CourseList, Program, Student } from "@/index";
import { BASE_URL } from "./url";

const PROGRAMS_URL = `${BASE_URL}/programs`;
const STUDENTS_URL = `${BASE_URL}/students`;
const COUNTRIES_URL = `${BASE_URL}/countries`;

//get all programs
export const getPrograms = async (token: string) => {
    try {
        const response = await fetch(`${PROGRAMS_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        
        return data as Program[];
    } catch (error) {
        throw new Error(`Failed to get programs: ${error}`);
    }
}

//Get program by code
export const getProgramByCode = async (code: string, token: string) => {
    try {
        const response = await fetch(`${PROGRAMS_URL}/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data as Program;
    } catch (error) {
        throw new Error(`Failed to get program: ${error}`);
    }
}

//get all courses
export const getCourses = async (token: string) => {
    try {
        const response = await fetch(`${PROGRAMS_URL}/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache:'default'
        });
        const data = await response.json();
        return data as CourseList;
    } catch (error) {
        throw new Error(`Failed to get courses: ${error}`);
    }
}

//ge all students
export const getStudents = async (token: string) => {
    try {
        const response = await fetch(`${STUDENTS_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as Student[];
    } catch (error) {
        throw new Error(`Failed to get students: ${error}`);
    }
}

//Get all countries
export const getCountries = async (token: string) => {
    try {
        const response = await fetch(`${COUNTRIES_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'default'
        });
        const data = await response.json();
        return data as Country[];
    } catch (error) {
        throw new Error(`Failed to get countries: ${error}`);
    }
}