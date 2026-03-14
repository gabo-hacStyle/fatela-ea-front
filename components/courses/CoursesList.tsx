'use client';
import React, { useEffect } from 'react'
import { handleGetCourses, handleGetCoursesByYear } from '@/actions/courseActions'
import { CoursesByYear, MenuCourse } from '@/index'
import { useUpdateYearCourses, useUpdateCourseListNumber } from '@/hooks/useCourses';
import { isNumberToken } from 'html2canvas/dist/types/css/syntax/parser';


const CoursesList =  () => {

  const { year } = useUpdateYearCourses();
  const { setTotalCourses } = useUpdateCourseListNumber();
  const [courseList, setCourseList] = React.useState<MenuCourse[] | null>(null);
  const [courseListByYear, setCourseListByYear] = React.useState<CoursesByYear[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false)
  useEffect(() => {
    const fetch = async () => {
      const courses = await handleGetCourses(null)
      if(courses) {
        setCourseList(courses.data)
        setTotalCourses(courses.total)
      }
      
    } 
    fetch()
  }, [])

  useEffect(() => {
    setCourseList(null)
    setCourseListByYear(null)
    if (!year) {
      return; // no year selected
    }

    const fetch = async () => {
      console.log("Cambio en año")
      setLoading(true)
      const coursesByYear = await handleGetCoursesByYear(year)

      if (coursesByYear) {
        setCourseListByYear(coursesByYear)
        const total = coursesByYear.reduce((acc, item) => acc + (item.courses?.length ?? 0), 0)
        setTotalCourses(total)
      } else {
        setCourseListByYear([])
        setTotalCourses(0)
      }

      setLoading(false)
    }
    fetch()
  }, [year])

  return (
      <div className="w-full p-4  rounded-lg shadow-md">
      {courseList && courseList.map((course: MenuCourse) => (
        <p key={course.courseCode + course.courseProgram} className=' p-4 border-b border-gray-400'>{course.courseCode} - {course.courseName}: {course.courseTeacher}</p>
      ))}

      {courseListByYear && courseListByYear.map((programData: CoursesByYear) => (
        <div key={programData.program} className='mb-4'>
          <h3 className='font-semibold text-lg mb-2'>{programData.program}</h3>
          {programData.courses && programData.courses.length > 0 ? (
            programData.courses.map((course) => (
              <p key={course.courseCode + programData.program} className='p-4 border-b border-gray-400'>
                {course.courseCode} - {course.courseName}: {course.courseTeacher ? course.courseTeacher : "No hay profesor registrado"}
              </p>
            ))
          ) : (
            <p className='p-4 border-b border-gray-400'>No hay cursos en este programa.</p>
          )}
        </div>
      ))}

      {loading && (
          <p>Loading...</p>
      )}

      

    </div>
  )
}

export default CoursesList