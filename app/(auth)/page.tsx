import FormAuth from '@/components/login/FormAuth'
import React from 'react'
// import Link from 'next/link'
import {Card, CardContent} from '@/components/ui/card';

//internacionalizacion
// import {useTranslations} from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
// import { useTranslations } from 'next-intl';

const page = async () => {
  const t = await getTranslations('LoginPage');
  return (
    <div className="my-20">
    <h1 className="font-bold text-center text-5xl italic">AnReHis</h1>
    <article
      className="max-w-md mx-auto my-10 ">
        <Card className='p-6 shadow-lg'>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t('title')}
          </h2>
          <CardContent>
          <FormAuth />
        
        <p className='my-2'>
            <Link
                href="mailto:gabo2023brazil@gmail.com"
                className="text-accent hover:underline"
            >
                {t('noAccount')}
            </Link>
        </p>
          </CardContent>
        </Card>


     

        
      
    </article>
    
  </div>
  )
}

export default page