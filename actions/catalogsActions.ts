'use server';
// import { Course, CourseList, Program, Student } from '@/index'

import { getPrograms, getCourses, getStudents, getCountries } from "@/services/backend/catalogs";
import { getCookie } from '@/utils/cookiesManager';


const bringToken = async () => {
    return await getCookie('token');
}


export const handleGetPrograms = async () => {
   try {
    const token = await bringToken();
    if(token) {
        return await getPrograms(token);
    }
    
   } catch (error) {
       throw new Error(`Failed to get programs: ${error}`);
    
   }
}

export const handleGetCourses = async () => {
    try {
     const token = await bringToken();
     if(token) {
        const courses =  await getCourses(token);
        const halfIndexCourses = Math.ceil(courses.length / 4);
        const coursesFirstHalf = courses.slice(0, halfIndexCourses);
        const coursesSecondHalf = courses.slice(halfIndexCourses);
        return [
            coursesFirstHalf,
            coursesSecondHalf
        ]
     }
     
    } catch (error) {
        throw new Error(`Failed to get programs: ${error}`);
     
    }
}

export const handleGetStudents = async () => {
    try {
     const token = await bringToken();
     if(token) {
         const students = await getStudents(token);
         
  const quarterIndexStudents = Math.ceil(students.length / 4);

  

  const studentsFirstQuarter = students.slice(0, quarterIndexStudents);
  const studentsSecondQuarter = students.slice(
    quarterIndexStudents,
    quarterIndexStudents * 2,
  );
  const studentsThirdQuarter = students.slice(
    quarterIndexStudents * 2,
    quarterIndexStudents * 3,
  );
  const studentsFourthQuarter = students.slice(quarterIndexStudents * 3);
  return [
    studentsFirstQuarter,
    studentsSecondQuarter,
    studentsThirdQuarter,
    studentsFourthQuarter
 ]     

}

    
     
    } catch (error) {
        throw new Error(`Failed to get programs: ${error}`);
     
    }
}

export const handleGetCountries = async () => {
    try {
     const token = await bringToken();
     if(token) {
         return await getCountries(token);
     }
     
    } catch (error) {
        throw new Error(`Failed to get programs: ${error}`);
     
    }
}