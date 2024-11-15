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
}
export const useUpdateInfo = create<UpdateInfoType>((set) => ({
    query: '',
    setQuery: (query: string) => set({query}),
}));