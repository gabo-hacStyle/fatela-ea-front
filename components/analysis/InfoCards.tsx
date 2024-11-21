/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {useState, useEffect, use} from 'react'
import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { useGraficoReferenced } from '@/hooks/useReportes';
import { handleGetQuantityInfo } from '@/actions/gradesActions';

import { useTranslations } from "next-intl";
import InfoCardsSkeleton from '../shared/skeletons/InfoCardsSkeleton';



interface InfoCardsProps {
  type: 'students' | 'courses' ;
  // data: number;

}

const InfoCards = ({type}: InfoCardsProps) => {
  const t = useTranslations('staffPage');
  const {query, mode, countryId, yearSelected} = useUpdateInfo();
  const {setTotalStudents} = useGraficoReferenced();
  const [data, setData] = useState<any>(null);
  const [periodo, setPeriodo] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log('Será que está o no esta habilitado?', coursesInProgram.active)
    // console.log('Este es el numero de cursos en el estado global', coursesInProgram.total)
    setLoading(true)
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
            setTotalStudents(response.totalStudents)
            break;
          case 'courses':
            
              setData(response.totalCourses)
            
            break;
          default:
            break;
        }
        
      }
      setLoading(false);
    }
    setTimeout(() => {
      responseData();
    }, 600)
    // responseData();

  }, [query, mode, countryId])

  

  return (
    <>
    {
      type === 'students' && (
      <h2 className='text-muted-foreground'>

      {t('timeTextDefault')} {`${periodo != null ? periodo : t('timeDefault')}`}
      </h2>
      )
    }
    {loading && (<InfoCardsSkeleton />)}
    <p>
      {data}
    </p>
    </>
  )
}

export default InfoCards