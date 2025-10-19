import { ReactNode } from "react";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import PaginationDatatable from "./pagination-datatable";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { LIMIT_LIST_PAGINATION } from "@/constants/datatable-constant";

interface DataTableProps {
  headers: string[], 
  data: (string | ReactNode)[][], 
  isLoading: boolean,
  totalPages: number,
  currentLimit: number,
  currentPage: number,
  onChangePage: (page: number) => void,
  onChangeLimit: (limit: number) => void,
}

export default function DataTable({ 
  headers, 
  data, 
  isLoading,
  totalPages,
  currentLimit,
  currentPage,
  onChangePage,
  onChangeLimit,
}: DataTableProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-0">
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {headers.map((column) => (
                <TableHead key={`th-${column}`} className="px-6 py-3">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, indexRow) => (
              <TableRow key={`tr-${indexRow}`}>
                {row?.map((column, indexColumn)=> (
                  <TableCell key={`tc-${indexRow}-${indexColumn}`} className="px-6 py-3">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={headers.length} className="h-24 text-center">
                  No Result Data
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={headers.length} className="h-24 text-center">
                  Loading
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Limit</Label>
          <Select value={currentLimit.toString()} onValueChange={(value) => (
            onChangeLimit(Number(value))
          )}>
            <SelectTrigger>
              <SelectValue placeholder="Select Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Limit</SelectLabel>
                {LIMIT_LIST_PAGINATION.map((limit) => (
                    <SelectItem key={limit} value={limit.toString()}>
                      {limit}
                    </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-end">
            <PaginationDatatable currentPage={currentPage} onChangePage={onChangePage} totalPages={totalPages}/>
          </div>
        )}
      </div>
    </div>
  )
}