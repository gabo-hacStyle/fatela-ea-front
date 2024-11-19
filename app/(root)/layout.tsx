
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
          <header className=" flex flex-col gap-10 lg:p-4 my-10 lg:mb-8">

          {/* <Badge className="w-1/6" variant={'secondary'}> */}
          <h1 className="lg:text-5xl text-2xl  font-semibold text-secondary">{userJson.name} </h1>
          {/* </Badge> */}
          <div className="flex items-center justify-between">
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

          </div>

            
          
            
            
          </header>
              
          <div className="w-full border-t border-gray-100 border-dotted bg-white/70">
            {children}
          </div>
          </main>
  
      </>
    ) 
  }
  
  export default layout