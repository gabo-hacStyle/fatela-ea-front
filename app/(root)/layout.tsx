
import LogoutButton from '@/components/shared/LogoutButton'
// import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { getCookie } from '@/utils/cookiesManager'
import { User } from '@/index';
import {Badge} from '@/components/ui/badge'
import { getTranslations } from 'next-intl/server';




const layout = async({children}: Readonly<{children: React.ReactNode}>) => {
    const t = await getTranslations('');

    const user = await getCookie('user');
    const userJson = JSON.parse(user? user : '') as User;
    const rolesList = userJson.roles.map((role) => role);
    const country = userJson.country.countryName;
  
    return (
      <>
          {/* <Sidebar role="admin" /> */}
          <main className="wrapper">
          <header className="header-container lg:p-4 my-10 lg:mb-8">
            <h1 className="text-5xl text-left font-semibold">
                {/*Condicionando texto*/ }
                {rolesList.includes('ADMIN') ? 
                // t('admin') 
                'Pagina de administración de la plataforma'
                : 
                rolesList.includes('STAFF') ? 
                // t('coordinator') 
                'Pagina de funcionarios para analisis de datos'
                : 
                // t('staff')
                'Pagina de coordinador: ' + country
                }
            
            </h1>
          <LogoutButton position='top'/>
          <Badge variant={'secondary'}>
          <h1 className="lg:text-5xl text-2xl lg:px-10 px-7 font-semibold">{userJson.name} </h1>
          </Badge>
            
            
          </header>
              
          <div className="w-full">
            {children}
          </div>
          </main>
  
      </>
    ) 
  }
  
  export default layout