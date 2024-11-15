'use client';
import React, {useState, useEffect, use} from 'react'
import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { handleGetQuantityInfo } from '@/actions/gradesActions';





interface InfoCardsProps {
  type: 'students' | 'courses' ;
  // data: number;

}

const InfoCards = ({type}: InfoCardsProps) => {
  const {query} = useUpdateInfo();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const responseData = async () => {
      const response = await handleGetQuantityInfo(query);
      setData(
        type === 'students' ? response.totalStudents : response.totalCourses
      );
    }
    responseData();

  }, [query])



  return (
    <>
    <p>
      {data}
    </p>
    </>
  )
}

export default InfoCards