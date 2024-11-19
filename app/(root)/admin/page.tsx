import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { handleGetUsers } from '@/actions/userActions'

//Types:
import { User } from '@/index'
import UserDialog from '@/components/admin/UserDialog'

//internacionalizacion
import { getTranslations } from 'next-intl/server'
import { getCookie } from '@/utils/cookiesManager'
import { getCountries } from '@/services/backend/catalogs'


const page = async () => {
  const t = await getTranslations('AdminPage');

  const token = await getCookie('token') as string;
  const countries = await getCountries(token);
  const usersList = await handleGetUsers() as User[];

  return (
    <>
      <header className='flex items-center justify-between'>
        
        <p className='w-3/4'>
          {t('info')}
        </p>

        <UserDialog usage='add' countries={countries} user={null}/>
        
      </header>
      <section className='my-10'>
        <h1 className='font-semibold text-2xl'>
        {t('listTitle')}
        </h1>
        <ul className='flex flex-col gap-5 my-5'>
          {
            usersList.map((user) => {
              return (
                <li className="flex justify-between items-center " key={user.userId}>
                  <Card className='w-full flex items-center justify-between'>
                    <CardHeader>
                      <CardTitle>{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                      <p className='text-gray-500'>
                        Roles: 
                        {user.roles.map((role) => {
                          return (
                            <span key={role}>
                              {' '}{`${role}`}
                            </span>
                          )
                        })}
                      </p>
                      <p>
                        {t('countryLabel')}: {user.country.countryName}
                      </p>
                    </CardHeader>
                    <CardContent className='flex gap-5'>
                    <UserDialog usage='edit'   countries={countries} user={user} />
                    <UserDialog usage='delete' countries={countries} user={user} />
                    </CardContent>
                  </Card>
                </li>
              )
            })
          }

       
        
         
        </ul>
      </section>


        
    </>
    
  )
}

export default page