import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {Table, TableBody, TableCell, TableRow} from '@/components/ui/table'

const TableSkeleton = () => {
  return (
    <>
    <Table>
        <TableBody>
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
        </TableBody>
    </Table>
        

    </>
  )
}

export default TableSkeleton