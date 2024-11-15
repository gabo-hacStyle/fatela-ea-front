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
// import Loading from "./Loading"

import { defaultValuesFilters} from '@/utils/index';
// import { useRouter } from 'next/navigation';
// import { postLogin } from '@/services/backend/auth';

//Actions
import {handleGetQuantityInfo} from '@/actions/gradesActions'
import SelectItems from './SelectItems';
import SelectItemsPaginated from './SelectItemsPaginated';
import CheckboxItems from './CheckboxItems';

const filtersFormSchema = z.object({
    program: z.string().optional(),
    year: z.string().optional(),
    country: z.string().optional(),
    student: z.string().optional(),
    approved: z.string().optional(),
    course: z.string().optional(),
    gender: z.string().optional(),
});

const FiltersForm = () => {
    // const t = useTranslations('staffPage');

    //Defining the form
    const form = useForm<z.infer<typeof filtersFormSchema>>({
        resolver: zodResolver(filtersFormSchema),
        defaultValues: defaultValuesFilters,
    })
    const [error, setErrorForm] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);

    async function onSubmit(data: z.infer<typeof filtersFormSchema>) {
        console.log(data)
        // setDisabled(true);
        // try {
        //     const response = await handleGetQuantityInfo(data);
        //     console.log(response);
        //     setCreated(true);
        // } catch (error) {
        //     setErrorForm(error.message);
        // } finally {
        //     setDisabled(false);
        // }
    }

    return (
        <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                <FormField
                            control={form.control}
                            name='program'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {/* {t('emailLabel')} */}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItems field={field} type='program'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                            control={form.control}
                            name='country'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {/* {t('emailLabel')} */}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItems field={field} type='country'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                            control={form.control}
                            name='course'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {/* {t('emailLabel')} */}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItemsPaginated field={field} type='courses'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='year'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {/* {t('emailLabel')} */}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItems field={field} type='year'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='student'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>
                                        {/* {t('emailLabel')} */}

                                    </FormLabel>
                                    <FormControl>
                                        
                                        <SelectItemsPaginated field={field} type='students'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                
                                    <CheckboxItems field={field} type='gender' />
                                   
                            )}
                        />
                </div>

                <Button type='submit'>
                    Buscar
                </Button>
            </form>
        </Form>
    )


}

export default FiltersForm