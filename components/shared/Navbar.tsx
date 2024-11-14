'use client';
import React, {useTransition} from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

//icons
import { GlobeIcon } from 'lucide-react';

// import { usePathname } from 'next/navigation';

//internatcionalizacion
import { useTranslations } from 'next-intl';
import {handleChangeLocale} from '@/actions/localeActions';
import { setUserLocale } from '@/utils/cookiesManager';
import { Locale } from '@/i18n/config';

const Navbar = () => {

  const [isPending, startTransition] = useTransition();
    const t = useTranslations('NavBar');

    function onChange(value: string){
      const locale = value as Locale;
      startTransition(() => {
        setUserLocale(locale);
      });
    }

  
  return (
    <nav className="main-navbar ">
    <div className="logo">AnReHis</div>
    <div className="platform">{t('hero')} 📓</div>
    <Popover>
  <PopoverTrigger className='border bg-black rounded p-2'><GlobeIcon/></PopoverTrigger>
  <PopoverContent className='flex flex-col w-24'>
    <button className='cursor-pointer hover:bg-primary/10 p-1'  onClick={() => onChange('en')}>EN</button>
    <hr />
    <button className='cursor-pointer hover:bg-primary/10 p-1' onClick={() => onChange('es')} >ES</button>
    <hr /> 
    <button className='cursor-pointer hover:bg-primary/10 p-1' onClick={() => onChange('pt')} >PT</button>
  </PopoverContent>
</Popover>
  </nav>
  )
}

export default Navbar