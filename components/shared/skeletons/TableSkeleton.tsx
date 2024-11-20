import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {Table, TableBody, TableCell, TableRow} from '@/components/ui/table'

const TableSkeleton = () => {
  return (
    <>
    
            <TableRow>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-6 w-full" />
                </TableCell>
                
            </TableRow>
        

    </>
  )
}

export default TableSkeleton