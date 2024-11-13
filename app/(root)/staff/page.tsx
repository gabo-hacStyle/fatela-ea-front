import React from 'react'
import PieComponent from '@/components/analysis/charts/PieComponent'
import { getCookie } from '@/utils/cookiesManager'
import { getPrograms, getCourses, getStudents } from '@/services/backend/catalogs'
import { Badge } from "@/components/ui/badge"
import SelectItems from '@/components/analysis/filters/SelectItems'
import LogoutButton from '@/components/shared/LogoutButton'


const page = async () => {
  const token = await getCookie('token');
  // const programs = await getPrograms(token? token : '');
  const [programs, courses, students] =
    await Promise.all([
      getPrograms(token? token : ''),
      getCourses(token? token : ''),
      getStudents(token? token : ''),
     
    ]);

  return (
    <div>
      <h1>
        Hola soy un staff
      </h1>
      <LogoutButton position='sidebar'/>
    <section>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h2>Lista de todos los programas</h2>
          <div className="grid grid-cols-2 gap-4">
            <SelectItems programs={programs}  courses={null} students={null} type='programs'/>
            <SelectItems programs={null}  courses={courses} students={null} type='courses'/>
            <SelectItems programs={programs}  courses={null} students={students} type='students'/>

          </div>
            


        </div>
      </div>
    </section>

    </div>
  )
}

export default page