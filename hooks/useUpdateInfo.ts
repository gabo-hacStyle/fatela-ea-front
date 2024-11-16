import {create} from 'zustand';
// import { QuantityInfo } from '..';

// type QuantitiesInfo = {
//   info: QuantityInfo;
//   setInfo: (info: QuantityInfo) => void;
// };

// export const useCardsInfo = create<QuantitiesInfo>((set) => ({
//   info: {
//     totalMales: 0,
//     totalFemales: 0,
//     totalCourses: 0,
//     totalStudents: 0,
//     studentsByCountry: [{count: 0, country: ''}],
//   },
//   setCards: (info: QuantityInfo) => set({info}),
// }));

type UpdateInfoType = {
    query: string;
    setQuery: (query: string) => void;
    coursesInProgram: {
        active: boolean;
        total: number;
    };
    mode: 'staff' | 'coord' | null;
    setMode: (mode: 'staff' | 'coord') => void;
    countryId: number | null;
    setCountryId: (countryId: number | null) => void;
    setCoursesInProgram: (coursesInProgram: {
        active: boolean;
        total: number;
    }) => void;
    yearSelected: {
        selected: boolean;
        year: number;
    };
    setYearSelected: (yearSelected: {
        selected: boolean;
        year: number;
    }) => void;
}
export const useUpdateInfo = create<UpdateInfoType>((set) => ({
    query: '',
    setQuery: (query: string) => set({query}),
    coursesInProgram: {
        active: false,
        total: 0,
    },
    mode: null,
    setMode: (mode: 'staff' | 'coord') => set({mode}),
    countryId: null,
    setCountryId: (countryId: number | null) => set({countryId}),
    setCoursesInProgram: (coursesInProgram: {
        active: boolean;
        total: number;
    }) => set({coursesInProgram}),
    yearSelected: {
        selected: false,
        year: 0,
    },
    setYearSelected: (yearSelected: {
        selected: boolean;
        year: number;
    }) => set({yearSelected}),
}));