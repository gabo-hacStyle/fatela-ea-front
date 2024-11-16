'use client';
import React, { useEffect, useState } from 'react'

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

const TableContent = () => {
    const {query} = useUpdateInfo();
    const [queryPage, setQueryPage] = useState(0);
    const [data, setData] = useState<Note[]>();
    const [pagesInfo, setPagesInfo] = useState<PagesInfo>();
    const [loading, setLoading] = useState(false);
    const [queryNull, setQueryNull] = useState(true);


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
                const response = await handleGetGradesFiltered(`${query}${querypageReal}`);
                if(response) {
                    setData(response.content);
                    setPagesInfo(response.page);
                }
                setLoading(false);

            }
            
        };
        responseData();
    }, [query,  queryPage]);


    const handleTabChange = (index: number) => {
        setQueryPage(index);
      };

    const renderTabs = () => {
        const dataLength = pagesInfo?.totalPages;
        return Array.from({ length: dataLength || 0 }, (_, index) => (
          <TabsTrigger key={index} value={index.toString()} onClick={() => handleTabChange(index)}>
            {`Pagina ${index + 1}`}
          </TabsTrigger>
        ));
      };
      console.log(data)
  return (
    <>
        <TableBody>
            {queryNull && <TableRow><TableCell colSpan={7}>Selecciona un filtro para poder visualizar las notas</TableCell></TableRow>}
            {loading && <TableRow><TableCell>Loading...</TableCell></TableRow>}
            {(!loading && data) && data.map((item, index: number) => (
                <TableRow key={index}>
                    <TableCell>{item.studentName}</TableCell>
                    <TableCell className="bg-accent/50">{item.grade}</TableCell>
                    <TableCell>{item.approved}</TableCell>
                    <TableCell>{item.courseCode}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.year}</TableCell>
                </TableRow>
            ))}
                    
        </TableBody>

        <TableCaption>

            {pagesInfo?.totalElements}

            {/** PAGINACION */}
            <Tabs>
                <TabsList className="grid grid-cols-3 xl:grid-cols-12">
                    {renderTabs()}
                </TabsList>
                
            </Tabs>
        </TableCaption>
    </>
  )
}

export default TableContent