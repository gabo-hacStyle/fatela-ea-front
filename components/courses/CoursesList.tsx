'use client';
import React, { useEffect } from 'react'
import { handleGetCourses, handleGetCoursesByYear } from '@/actions/courseActions'
import { MenuCourse } from '@/index'
import { useUpdateYearCourses } from '@/hooks/useCourses';


const CoursesList =  () => {

  const { year } = useUpdateYearCourses();
  const [coursesListPaginated, setCoursesListPaginated] = React.useState<MenuCourse[] | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  useEffect(() => {
    const fetch = async () => {
      const courses = await handleGetCourses(null)
      if(courses) {
        setCoursesListPaginated(courses)
      }
      
    } 
    fetch()
  }, [])

  useEffect(() => {
    setCoursesListPaginated(null)
    console.log('year', year)
    const fetch = async () => {
      setLoading(true)
      if (year){
        const courses = await handleGetCoursesByYear(year)
        if(courses) {
          setCoursesListPaginated(courses)
        }
      }
     setLoading(false) 
    }
    fetch() 
  }, [year])

  return (
      <div className="w-full p-4  rounded-lg shadow-md">
      {coursesListPaginated && coursesListPaginated.map((course: MenuCourse) => (
        <p className=' p-4 border-b border-gray-400'>{course.courseCode} - {course.courseName}</p>
      ))}
      {
        loading && (
          <p>Loading...</p>
        )
      }

      

    </div>
  )
}

export default CoursesList