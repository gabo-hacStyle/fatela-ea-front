'use client';
import React, { useEffect, useState, useTransition } from 'react'

import {
    TableBody,
    TableCell,
    TableRow,
    TableCaption,
} from "@/components/ui/table"
import { useUpdateInfo } from '@/hooks/useUpdateInfo';
import { handleGetGradesFiltered } from '@/actions/gradesActions';
import { Note, PagesInfo } from '@/index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TableSkeleton from '../shared/skeletons/TableSkeleton';
import { useTranslations } from 'use-intl';
import { X } from 'lucide-react';

const TableContent = () => {
    const t = useTranslations('staffPage');
    
    const {query, mode, countryId} = useUpdateInfo();
    const [queryPage, setQueryPage] = useState(0);
    const [data, setData] = useState<Note[]>();
    const [pagesInfo, setPagesInfo] = useState<PagesInfo>();
    const [loading, setLoading] = useState(false);
    const [queryNull, setQueryNull] = useState(true);

    const [openInfo, setOpenInfo] = useState(false);
    


    useEffect(() => {
        setQueryPage(0);
    }, [query]);


    useEffect(() => {
        const responseData = async () => {
            
            const querypageReal = queryPage !==  0 ? `&page=${queryPage}` : '' ;
            if(query === '') {
                setQueryNull(true);
                setData([]);
                return;
            } else {
                setQueryNull(false);
                setLoading(true);
                const response = await handleGetGradesFiltered(`${query}${querypageReal}`,mode, countryId );
                if(response) {
                    setData(response.content);
                    setPagesInfo(response.page);
                }
                setLoading(false);

            }
            
        };
        responseData();
    }, [query,  queryPage, mode, countryId]);


    const handleTabChange = (index: number) => {
        setQueryPage(index);
      };

    const renderTabs = () => {
        const dataLength = pagesInfo?.totalPages;
        return Array.from({ length: dataLength || 0 }, (_, index) => (
          <TabsTrigger key={index} value={index.toString()} onClick={() => handleTabChange(index)}>
            {`${t('page')} ${index + 1}`}
          </TabsTrigger>
        ));
      };
    // const renderStudents = (code:string, email: string | null ) => {
    //     return (
    //         <>
    //         <X onClick={() => setOpenInfo(false)}/>
    //             <span className='block'>Codigo: {code}</span>
    //             <span className='block'>Email: {email ? email : 'No registra'}</span>

    //         </>
    //     )
    // }
    // const renderCourses = (program:string, teacher: string | null ) => {
    //     return (
    //         <>
    //         <X onClick={() => setOpenInfo(false)}/>
    //             <span className='block'>Programa: {program}</span>
    //             <span className='block'>Profesor: {teacher ? teacher : 'No registra'}</span>
    //         </>
    //     )
    // }
    //   console.log(data)
  return (
    <>
        <TableBody>
            {queryNull && <TableRow><TableCell colSpan={7}>{t('emptyTable')}</TableCell></TableRow>}
            {loading && <TableSkeleton />}
            {(!loading && data) && data.map((item, index: number) => (
                <TableRow key={index}>
                    <TableCell onClick={() => setOpenInfo(true)}>
                        {item.studentName}
                        <span className='block'>{t('codeLabel')}: {item.studentCode}</span>
                        <span className='block'>{t('emailLabel')}: {item.studentEmail ? item.studentEmail : t('nullValue')}</span>

                    </TableCell>
                    <TableCell >{item.grade}</TableCell>
                    <TableCell>{item.approved === 'S'? `${t('approvedLabel')}`: `${t('notApprovedLabel')}`}</TableCell>
                    <TableCell onClick={() => setOpenInfo(true)}>
                        {item.courseCode}
                        <span className='block'> {t('maestria')}: {item.courseProgram}</span>
                <span className='block'>{t('teacherLabel')}: {item.courseTeacher ? item.courseTeacher :  t('nullValue')}</span>
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.year}</TableCell>
                </TableRow>
            ))}
                    
        </TableBody>

        <TableCaption>

            {pagesInfo?.totalElements}

            {/** PAGINACION */}
            <Tabs>
                <TabsList className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
                    {renderTabs()}
                </TabsList>
                
            </Tabs>
        </TableCaption>
    </>
  )
}

export default TableContent