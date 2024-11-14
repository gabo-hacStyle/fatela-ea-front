'use client';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UsersForm from './UsersForm'
import {useTranslations} from 'next-intl';
import { Country, User } from '@/index';


interface Props {
    user: User | null;
    countries: Country[]
}

const CreateTabs = ({user, countries}: Props) => {
    const t = useTranslations('AdminPage');
    console.log('countries antes del formulaeio', countries)
  return (
    <>
        <Tabs defaultValue="normalUser" className="w-[400px]">
            <TabsList>
            <TabsTrigger value="normalUser">{t('tab1')}</TabsTrigger>
            <TabsTrigger value="adminUser">{t('tab2')}</TabsTrigger>
            </TabsList>
            <TabsContent value="normalUser">
                <h1>
                    {t('adminWarn')}
                </h1>
                <div>
                    <UsersForm  countries={countries} usage='add' user={user}/>
                </div>


            </TabsContent>
            <TabsContent value="adminUser">
               
                <div>
                    <UsersForm  countries={countries} usage='addAdmin' user={user}/>
                </div>

            </TabsContent>
        </Tabs>
  </>
  )
}

export default CreateTabs