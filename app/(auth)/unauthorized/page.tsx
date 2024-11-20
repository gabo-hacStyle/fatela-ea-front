
import React from 'react'
import { getTranslations } from 'next-intl/server'

const page = async () => {
    const t = await getTranslations('unauthorized')
    return (
    <div className='flex px-10 justify-center h-screen text-destructive text-2xl bg-slate-900'>
        <div className='mt-20'>
            <h1 className='mb-5'>{t('title')}</h1>
            <p>{t('message')}</p>
        </div>
    </div>
  )
}

export default page