import {create} from 'zustand';
import { MenuCourse } from '..';

type UpdateYearCoursesType = {
    year: number | null;
    setYear: (year: number | null) => void;
    
}

type UpdateCourseListNumberType = {
    totalCourses: number;
    setTotalCourses: (totalCourses: number) => void;
}
export const useUpdateYearCourses = create<UpdateYearCoursesType>((set) => ({
    year: null,
    setYear: (year: number | null) => set({year}),
    
}));

export const useUpdateCourseListNumber = create<UpdateCourseListNumberType>((set) => ({
    totalCourses: 0,
    setTotalCourses: (totalCourses: number) => set({totalCourses}),
}));
