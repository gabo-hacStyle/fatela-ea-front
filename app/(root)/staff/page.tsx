import React from 'react'
import PieComponent from '@/components/analysis/charts/PieComponent'
import { getCookie } from '@/utils/cookiesManager'
import { getPrograms, getCourses, getStudents } from '@/services/backend/catalogs'
import { Badge } from "@/components/ui/badge"
import SelectItems from '@/components/analysis/filters/SelectItems'
import LogoutButton from '@/components/shared/LogoutButton'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { getInitialInfo } from '@/services/backend/notas'
import InfoCards from '@/components/analysis/InfoCards'
import { PieFull } from '@/components/analysis/charts/PieFull'
import { getTranslations } from 'next-intl/server'
import { HorizontalBars } from '@/components/analysis/charts/HorizontalBars'


const page = async () => {

  //para internacionalizacion
  const t = await getTranslations('staffPage');
  const token = await getCookie('token');
  // const programs = await getPrograms(token? token : '');
  const [programs, courses, students] =
    await Promise.all([
      getPrograms(token? token : ''),
      getCourses(token? token : ''),
      getStudents(token? token : ''),
    ]);

    // const initialInfo = await getInitialInfo(token? token : '');
    const halfIndexCourses = Math.ceil(courses.length /4);
    const quarterIndexStudents = Math.ceil(students.length / 4);

    const coursesFirstHalf = courses.slice(0, halfIndexCourses);
    const coursesSecondHalf = courses.slice(halfIndexCourses);

    const studentsFirstQuarter = students.slice(0, quarterIndexStudents);
    const studentsSecondQuarter = students.slice(quarterIndexStudents, quarterIndexStudents * 2);
    const studentsThirdQuarter = students.slice(quarterIndexStudents * 2, quarterIndexStudents * 3);
    const studentsFourthQuarter = students.slice(quarterIndexStudents * 3);

  return (
    <div>
      <header>
        <p className="text-2xl font-semibold">{t('header')}</p>
      </header>
      
      <LogoutButton position='sidebar'/>
    <section id="filtros" className=' border-secondary border-2 rounded-lg p-6 mx-auto my-9'>
      <h2 className="text-xl">
        {t('filtersTitle')}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          
          <div className="grid md:grid-cols-2 gap-4">
            <SelectItems programs={programs}  courses={null} students={null} type='programs'/>
            <SelectItems programs={null}  courses={[coursesFirstHalf, coursesSecondHalf]} students={null} type='courses'/>
            <SelectItems
              programs={null}
              courses={null}
              students={[studentsFirstQuarter, studentsSecondQuarter, studentsThirdQuarter, studentsFourthQuarter]}
              type="students"
/>
          </div>
            


        </div>
      </div>
    </section>

    <section className="grid gap-5" id="analysis">
      <section  className="grid md:grid-cols-2 2xl:grid-cols-4 gap-5" id="numbersPart">
        <Card>
          <CardHeader>
            <CardTitle>{t('studentsTotal')}</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoCards type={'students'} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('coursesTotal')}</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoCards type={'courses'} />
          </CardContent>
        </Card> 

        

      </section>
      <section className='grid grid-cols-2 gap-5'>
      <PieFull type={'genders'} />
      <HorizontalBars />
      <div className='h-28'></div>
      <div className='h-28'></div>
      <div className='h-28'></div>
      </section>

    </section>

    </div>
  )
}

export default page