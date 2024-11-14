import LogoutButton from '@/components/shared/LogoutButton'
// import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { getCookie } from '@/utils/cookiesManager'
import { User } from '@/index';
const layout = async({children}: Readonly<{children: React.ReactNode}>) => {

  const user = await getCookie('user');
  const userJson = JSON.parse(user? user : '') as User;

  return (
    <>
        {/* <Sidebar role="admin" /> */}
        <main className="wrapper lg:h-[95vh] lg:oveflow-y-scroll">
        <header className="header-container p-2 lg:p-4 my-4 lg:mb-8">
        <LogoutButton position='top'/>
          <h1 className="lg:text-5xl text-left font-semibold">{userJson.name} </h1>
          
        </header>
            
        <div className="w-full">
          {children}
        </div>
        </main>

    </>
  ) 
}

export default layout