import {create} from 'zustand';

type UpdateYearCoursesType = {
    year: number | null;
    setYear: (year: number | null) => void;
    
}
export const useUpdateYearCourses = create<UpdateYearCoursesType>((set) => ({
    year: null,
    setYear: (year: number | null) => set({year}),
    
    
}));
