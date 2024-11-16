'use client';
import React, {useState, useEffect, use} from 'react'
import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { handleGetQuantityInfo } from '@/actions/gradesActions';

import { useTranslations } from "next-intl";



interface InfoCardsProps {
  type: 'students' | 'courses' ;
  // data: number;

}

const InfoCards = ({type}: InfoCardsProps) => {
  const t = useTranslations('staffPage');
  const {query, mode, countryId, yearSelected} = useUpdateInfo();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();

  useEffect(() => {
    // console.log('Será que está o no esta habilitado?', coursesInProgram.active)
    // console.log('Este es el numero de cursos en el estado global', coursesInProgram.total)

    const responseData = async () => {
      console.log('mode en el cliente', mode)
      console.log('countryId en el cliente', countryId)
      const response = await handleGetQuantityInfo(query, mode, countryId);
      if(response) {
        if(yearSelected.selected){
          setPeriodo(yearSelected.year);
        }
        switch (type) {
          case 'students':
            setData(response.totalStudents);
            break;
          case 'courses':
            
              setData(response.totalCourses)
            
            break;
          default:
            break;
        }
        
      }
      
    }
    setTimeout(() => {
      responseData();
    }, 600)
    // responseData();

  }, [query, mode, countryId])

  

  return (
    <>
    <h2 className='text-muted-foreground'>
    {t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}
    </h2>
    <p>
      {data}
    </p>
    </>
  )
}

export default InfoCards