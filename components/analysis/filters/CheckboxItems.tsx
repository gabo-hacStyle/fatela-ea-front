'use client';
import React, {useState, useEffect} from 'react'
import {Checkbox} from '@/components/ui/checkbox'
import { FormItem, FormLabel } from '@/components/ui/form';


interface Props {
    type: 'approved' | 'gender';
    field: any;
}


const CheckboxItems = ({type, field}: Props) => {

    // const [data, setData] = useState<any>(null);

  return (
    <div>

        {
            type === 'approved' ? (
                <div className='flex items-center justify-around'> 
                <FormItem className=" gap-4 w-full mt-6 items-center flex" >
                <Checkbox
                    
                   
                    checked={field.value === 'S'}
                    onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'S' : '')
                        }   
                    }
                />  <FormLabel>
                    Solo aprovados
                </FormLabel>
                                    
                </FormItem>
                <FormItem className=" gap-4 w-full mt-6 items-center flex">
                
                <Checkbox
                    
                    checked={field.value === 'N'}
                   onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'N' : '')
                        }
                   }
                />  <FormLabel>
              No aprobados
            </FormLabel>
                </FormItem>

                </div>
                

            ) : (
                <div className='flex items-center justify-around'> 
                <FormItem className=" gap-4 w-full mt-6 items-center flex">
                <Checkbox
                    checked={field.value === 'Masculino'}
                   onCheckedChange={
                        (checked) => {
                           field.onChange(checked ? 'Masculino' : '')
                        }
                   }
                />  <FormLabel>
                Masculino
            </FormLabel>

                </FormItem>
               
                <FormItem className=" gap-4 w-full mt-6 items-center flex">
                <Checkbox
                    checked={field.value === 'Femenino'}
                   onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'Femenino' : '')
                        }

                   }
                />  <FormLabel>
                Femenino
            </FormLabel>
                    
                </FormItem>

                
                
                </div>
                
            )
        }
        

    </div>
  )
}

export default CheckboxItems