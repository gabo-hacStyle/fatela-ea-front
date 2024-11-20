import { RefObject } from 'react';
import {create} from 'zustand';

export type GraficoReferenced = {
    graficoRef1: RefObject<HTMLDivElement>;
    graficoRef2: RefObject<HTMLDivElement>;
    graficoRef3: RefObject<HTMLDivElement>;

    // Setters
    setGraficoRef1: (graficoRef1: RefObject<HTMLDivElement>) => void;
    setGraficoRef2: (graficoRef2: RefObject<HTMLDivElement>) => void;
    setGraficoRef3: (graficoRef3: RefObject<HTMLDivElement>) => void;

    // Filtros aplicados:
    program: string | null;
    setProgram: (program: string | null) => void;
    country: number | null;
    setCountry: (country: number | null) => void;
    year: number | null;
    setYear: (year: number | null) => void;
    gender: string | null;
    setGender: (gender: string | null) => void;
    status: string | null;
    setStatus: (status: string | null) => void;


    //Info en numeros
    betterYear: number | null;
    setBetterYear: (betterYear: number | null) => void;
    worstYear: number | null;
    setWorstYear: (worstYear: number | null) => void;
    totalStudents: number | null;
    setTotalStudents: (totalStudents: number | null) => void;
}

export const useGraficoReferenced = create<GraficoReferenced>((set) => ({
    graficoRef1: {current: null},
    graficoRef2: {current: null},
    graficoRef3: {current: null},

    setGraficoRef1: (graficoRef1: RefObject<HTMLDivElement>) => set({graficoRef1}),
    setGraficoRef2: (graficoRef2: RefObject<HTMLDivElement>) => set({graficoRef2}),
    setGraficoRef3: (graficoRef3: RefObject<HTMLDivElement>) => set({graficoRef3}),


    program: null,
    setProgram: (program: string | null) => set({program}),
    country: null,
    setCountry: (country: number | null) => set({country}),
    year: null,
    setYear: (year: number | null) => set({year}),
    gender: null,
    setGender: (gender:string | null ) => set({gender}),
    status: null,
    setStatus: (status: string | null) => set({status}),



    betterYear: null,
    setBetterYear: (betterYear: number | null) => set({betterYear}),
    worstYear: null,
    setWorstYear: (worstYear: number | null) => set({worstYear}),
    totalStudents: null,
    setTotalStudents: (totalStudents: number | null) => set({totalStudents}),
}));