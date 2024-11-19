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

import { defaultValuesAuthForm} from '@/utils/index';
// import { useRouter } from 'next/navigation';
// import { postLogin } from '@/services/backend/auth';

//Actions
import {handleLoginUser} from '@/actions/authActions'



const authFormSchema = z.object({
    // username: z.string({ required_error: "El campo 'Nombre' no puede estar vacío." }),
    // user_name: z.string({ required_error: "El campo 'email' no puede estar vacío." }).optional(),
    email: z.string().email({ message: "El campo 'email' debe ser un correo electrónico válido." }),
    password: z.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    // newPassword: z.string().optional(),
    // rememberMe: z.boolean().optional(),
    
});
const FormAuth = () => {
  const t = useTranslations('LoginPage');
  const u = useTranslations('shared');

  //Defining the form
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: defaultValuesAuthForm,
  })
  const [error, setErrorForm] = useState('')
    // const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [created, setCreated] = useState(false);

    async function onSubmit(data: z.infer<typeof authFormSchema>) {
      setErrorForm('')
        // setDisabled(true);
        setLoading(true);
        
            const response = await handleLoginUser(data);
            console.log(response)
            if(response === '403'){
              // setCreated(true);
              setErrorForm(t('invalidCredentials'))
            } 
            if(response === '500'){
              // setCreated(true);
              setErrorForm(t('serverError'))
            }
            
        
        
        // setDisabled(false);
        setLoading(false);
    }

  return (
    <Form {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel>{t('emailLabel')}</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text"
                                        placeholder='staff@fatela.org'
                                        onFocus={() => setErrorForm('')}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
       
        
      </div>

      <div className="mb-6">
      <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className="w-full mt-6" >
                                    <FormLabel> {t('passwrodLabel')}</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" 
                                        placeholder=''
                                        onFocus={() => setErrorForm('')}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
      </div>

      <div className="flex items-center justify-between">
       <Button
            type="submit"
            className="w-full"
          >
            {t('loginButton')}
          </Button>
      </div>
      {loading && <div>{u('loading')}</div>}
      {error && <div>{error}</div>}
    </form>


    </Form>
  )
}

export default FormAuth