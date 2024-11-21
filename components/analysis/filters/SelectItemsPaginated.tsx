
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {useEffect, useState} from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  // import {
   
  //   FormControl,
 
  // } from "@/components/ui/form";

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
import { handleGetCourses, handleGetPrograms, handleGetStudents } from '@/actions/catalogsActions';

  
// interface SelectItemsProps {
//     programs: Program[] | null;
//     courses: CourseList[] | null;
//     students: Student[][] | null;
//     type: 'courses' | 'programs' | 'students';
// }
interface SelectItemsProps {
 field: any
  type: 'courses'  | 'students';
}


const SelectItemsPaginated = ({field, type}: SelectItemsProps) => {
    const t = useTranslations('staffPage');
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<any>(null);


  useEffect(() => {
    const asyncGetData = async () => {
      setLoading(true);
      switch (type) {
        case 'courses':{
          const cr = await handleGetCourses();
          setData(cr);
          break;}
        case 'students':{
          const st = await handleGetStudents();
          setData(st);
          break;}
      }
      setLoading(false);

    }
    asyncGetData();
    
  }
  , []);



    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
      };
    
      const renderSelectItems = () => {
        if (loading) {
          return <SelectItem value="loading">Loading...</SelectItem>;
        }
    
        if (type === 'courses' && data[selectedTab]) {
          return data[selectedTab].map((course: string, index: number) => (
            <SelectItem key={index} value={course}>
              {course}
            </SelectItem>
          ));
        } else if (type === 'students' && data[selectedTab]) {
          return data[selectedTab].map((student: Student, index: number) => (
            <SelectItem key={index} value={student.studentCode}>
              {student.studentName}
            </SelectItem>
          ));
        }
        return null;
      };
    
      const renderTabs = () => {
        const dataLength = data?.length;
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
              <Select defaultValue={field.value} onValueChange={field.onChange}>
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

export default SelectItemsPaginated