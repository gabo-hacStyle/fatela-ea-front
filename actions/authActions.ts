'use server';

//Servicios
import {postLogin} from '@/services/backend/auth';
import { getUserByid } from '@/services/backend/users';

//Utils con cookies
import {setCookie} from '@/utils/cookiesManager';
import { redirect } from 'next/navigation';
//Tipos
import {ResponseBody, LoginBody} from '@/index';
import {getLocale} from 'next-intl/server';

 

export const handleLoginUser = async (data: LoginBody) => {
    const response = await postLogin(data);
    // const locale = await getLocale();
   
    

    if(response.authenticated){
        
        const user = await getUserByid(response.email, response.token);
        
        //Guardamos el token en una cookie
        await setCookie('token', response.token);
        await setCookie('user', JSON.stringify(user));
        
        //Dependiendo de los roles, redirigimos a una página u otra
        if(response.roles.some(role => role.authority === 'ROLE_ADMIN')){
            redirect('/admin');
        } else if(response.roles.some(role => role.authority === 'ROLE_STAFF')){
            redirect('/staff');
        }
        else {
            
            const country = await user.country.countryName;

            redirect(`/coordinator/${country}`);
        }
        
        
    } else {
        return false;
    }
    
}