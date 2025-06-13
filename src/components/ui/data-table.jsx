import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"; // Ajustá ruta según estructura
import { Button } from "./button"; // Ajustá ruta
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DataTable({
  columns,
  data,
  idField,
  onRowClick,
  enableRowClick,
  rowClassName,
}) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const from = totalRows > 0 ? pageIndex * pageSize + 1 : 0;
  const to = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
            <span className="text-md font-medium text-foreground">
              Cargando proveedor...
            </span>
          </div>
        </div>
      )}
      <div className="rounded-md border my-4 overflow-x-auto ">
        <Table className="w-full min-w-[700px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold bg-slate-50 text-slate-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={
                    (enableRowClick ? "cursor-pointer hover:bg-muted " : "") +
                    (row.original.estado_logico === 0
                      ? "bg-red-200 hover:bg-red-300 "
                      : "") +
                    (rowClassName ? rowClassName(row.original) : "")
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ""}
                      onClick={
                        enableRowClick &&
                        ![
                          "select",
                          "actions",
                          "archivos",
                          "observaciones",
                        ].includes(cell.column.id)
                          ? () => {
                              const selectedText = window
                                .getSelection()
                                ?.toString();
                              if (selectedText) return;

                              if (onRowClick) {
                                onRowClick(row.original);
                              } else {
                                setIsLoading(true);
                                navigate(
                                  `/proveedores/${row.original[idField]}`
                                );
                              }
                            }
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {from} a {to} de {totalRows} resultados
        </div>
        <div className="flex items-center justify-end space-x-2 py-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4 relative top-[1px]" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4 relative top-[1px]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
