'use client';
import React, {useState} from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
//   import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
//   } from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button';

//Tipos 
import { Course, CourseList, Program, Student } from '@/index'

//i18n
import { useTranslations } from 'next-intl';

  
interface SelectItemsProps {
    programs: Program[] | null;
    courses: CourseList[] | null;
    students: Student[][] | null;
    type: 'courses' | 'programs' | 'students';
}


const SelectItems = ({programs, courses, students, type}: SelectItemsProps) => {
    const t = useTranslations('staffPage');


    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
      };
    
    const renderSelectItems = () => {
        if (type === 'programs' && programs) {
          return programs.map((program, index) => (
            <SelectItem key={index} value={program.programCode}>
              {program.name}
            </SelectItem>
          ));
        } else if (type === 'courses' && courses) {
          return courses[selectedTab].map((course, index) => (
            <SelectItem key={index} value={course}>
              {course}
            </SelectItem>
          ));
        } else if (type === 'students' && students) {
          return students[selectedTab].map((student, index) => (
            <SelectItem key={index} value={student.studentCode}>
              {student.studentName}
            </SelectItem>
          ));
        }
        return null;
      };
    
      const renderTabs = () => {
        const dataLength = type === 'courses' ? courses?.length : students?.length;
        return Array.from({ length: dataLength || 0 }, (_, index) => (
          <TabsTrigger key={index} value={index.toString()} onClick={() => handleTabChange(index)}>
            {`${t('page')} ${index + 1}`}
          </TabsTrigger>
        ));
      };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'}>{t('select')} {
              type === 'programs' ? t('programs') :
              type === 'courses' ? t('courses') :
              t('students')
            
            }</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Tabs defaultValue="0">
            <TabsList>
              {renderTabs()}
            </TabsList>
            <TabsContent value={selectedTab.toString()}>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Select ${type}`} />
                </SelectTrigger>
                <SelectContent>
                  {renderSelectItems()}
                </SelectContent>
              </Select>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default SelectItems