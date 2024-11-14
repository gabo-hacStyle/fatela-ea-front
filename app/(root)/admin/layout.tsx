// import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/shared/LogoutButton'
// import Link from 'next/link'
import UserDialog from '@/components/admin/UserDialog'
import {useTranslations} from 'next-intl';
import Link from 'next/link'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  const t = useTranslations('AdminPage');
  return (
    <>
        <main className="wrapper lg:oveflow-y-scroll">
            <header className='my-10'>
            
                <section className='flex justify-between items-center'>
                <h1 className="text-5xl text-left font-semibold">{t('title')} </h1>

                <div className='flex gap-10 items-center'>

              
              
                  <div className='flex flex-col gap-3'>
                    <Link
                      href='/staff'
                    >
                      {t('linkAnalisys')}
                    </Link>
                  <LogoutButton position='sidebar'/>
                  </div>

                </div>
                  

                  
                  

                </section>
            </header>

        
            
        <div className="w-full">
          {children}
        </div>
        </main>

    </>
  ) 
}

export default layout