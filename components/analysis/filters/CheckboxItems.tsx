'use client';
import React, {useState, useEffect} from 'react'
import {Checkbox} from '@/components/ui/checkbox'
import { FormItem } from '@/components/ui/form';


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
                <>
                <FormItem className="w-full mt-6" >
                <Checkbox
                    
                   
                    checked={field.value === 'S'}
                    onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'S' : '')
                        }   
                    }
                /> <span>
                    Solo aprovados
                </span>
                                    
                </FormItem>
                <FormItem className="w-full mt-6">
                
                <Checkbox
                    
                    checked={field.value === 'N'}
                   onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'N' : '')
                        }
                   }
                /> <span>
                    Solo NO aprovados
                </span>
                </FormItem>

                </>
                

            ) : (
                <>
                <FormItem className="w-full mt-6">
                <Checkbox
                    checked={field.value === 'Masculino'}
                   onCheckedChange={
                        (checked) => {
                           field.onChange(checked ? 'Masculino' : '')
                        }
                   }
                /> <span>
                    Masculino
                </span>

                </FormItem>
               
                <FormItem className="w-full mt-6">
                <Checkbox
                    checked={field.value === 'Femenino'}
                   onCheckedChange={
                        (checked) => {
                            field.onChange(checked ? 'Femenino' : '')
                        }

                   }
                /> <span>
                    Femenino
                </span>
                    
                </FormItem>

                
                
                </>
                
            )
        }
        

    </div>
  )
}

export default CheckboxItems