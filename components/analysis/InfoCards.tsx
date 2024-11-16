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
    // console.log('Será que está o no esta habilitado?', coursesInProgram.active)
    // console.log('Este es el numero de cursos en el estado global', coursesInProgram.total)

    const responseData = async () => {
      const response = await handleGetQuantityInfo(query);
      if(response) {
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