/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {useState, useEffect} from 'react'
// import { handleCreateAdmin, handleCreateUser, handleLoginUser } from '@/actions/users';
//internacionalizacion
import {useTranslations} from 'next-intl';

//Shadcn staff for forms
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

//UI needed
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { defaultValuesFilters} from '@/utils/index';


//Actions
import {handleGetQuantityInfo} from '@/actions/gradesActions'
import SelectItems from './SelectItems';
// import SelectItemsPaginated from './SelectItemsPaginated';
import CheckboxItems from './CheckboxItems';
import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { useGraficoReferenced } from '@/hooks/useReportes';
import { useUpdateYearCourses } from '@/hooks/useCourses';

const filtersFormSchema = z.object({
    program: z.string().optional(),
    year: z.string().optional(),
    countryId: z.string().optional(),
    student: z.string().optional(),
    approved: z.string().optional(),
    course: z.string().optional(),
    gender: z.string().optional(),
});


interface Props {
    view:   'staff' | 'coord';
    category: 'students' | 'courses' | null;
}
const FiltersForm = ({view, category}: Props) => {
    const t = useTranslations('staffPage');
    const { setQuery, setYearSelected } = useUpdateInfo();
    const { 
        setProgram, setCountry, setYear, setStatus, setGender
    }  = useGraficoReferenced();
    const {setYear: setYearCourses} = useUpdateYearCourses();
    useEffect(() => {
        setQuery('');
    }, [])
    

    //Defining the form
    const form = useForm<z.infer<typeof filtersFormSchema>>({
        resolver: zodResolver(filtersFormSchema),
        defaultValues: defaultValuesFilters,
    })
    

    async function onSubmit(data: z.infer<typeof filtersFormSchema>) {
        console.log(data)
        setProgram(data.program? data.program : null);
        setCountry(data.countryId? Number(data.countryId) : null);
        setYear(data.year? Number(data.year) : null);
        setStatus(data.approved? data.approved : null);
        setGender(data.gender? data.gender : null);

        switch (category) {
            case 'students': {
                const filteredData = Object.entries(data).filter(
                    ([key, value]) => value !== undefined && value !== ''
                  );
              
                  // Construir la query de tipo URL
                  const queryParams = new URLSearchParams(filteredData as [string, string][]).toString();
                  const queryUrl = `${queryParams}`;
              
                  
        
                setQuery(queryUrl);
            }
            break;
            case 'courses': {
                setYearSelected({selected: true, year: Number(data.year)})
                setYearCourses(data.year? Number(data.year) : null);
            }

        }        
        

    }

    
    return (
        <Form {...form}>
            
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4 mb-4 text-black">

                    <FormField
                            control={form.control}
                            name='year'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {t('year')}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItems field={field} type='year'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {category === 'students' && (
                            <>
                            <FormField
                            control={form.control}
                            name='program'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {t('maestria')}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItems field={field} type='program'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            view === 'staff' ? (
                            <FormField
                                control={form.control}
                                name='countryId'
                                render={({ field }) => (
                                    <FormItem className="w-full mt-6" >
                                        <FormLabel>
                                            {t('country')}

                                        </FormLabel>
                                        <FormControl>
                                            
                                            <SelectItems field={field} type='country'/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            ): null
                        }
                    
                    
                        
                        {view === 'staff' && (<div className='hidden md:block'></div>)}
                        
                        <FormField 
                            control={form.control}
                            name='approved'
                            render={({ field }) => (
                              
                                
                                    <CheckboxItems field={field} type='approved'/>
                                    
                                
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='gender'
                            render={({ field }) => (
                                <>
                                    <CheckboxItems field={field} type='gender' />
                                </>   
                            )}
                        />
                            </>
                        )
                        }
                     
                        
                </div>
                            <div className='flex md:justify-end '> 
                            <Button type='submit'>
                    {t('btnSearch')}
                </Button>

                            </div>
                
            </form>
        </Form>
    )


}

export default FiltersForm