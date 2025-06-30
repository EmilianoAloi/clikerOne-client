import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const tableHeaderClass = "text-slate-700 font-semibold bg-slate-50";
const cellClass = "py-3 px-2";
const rightCellClass = "py-3 px-2 text-right";
const monoCellClass = "py-3 px-2";
const descCellClass = "py-3 px-2 max-w-xs truncate";

const HistorialPreciosTable = ({
  filteredHistory,
  formatDate,
  formatPrice,
  getPriceChangeIcon,
  getPriceChangeBadge,
}) => {
  return (
    <Card className="rounded-none border-0 ">
      <CardHeader>
        <CardTitle>Historial de Cambios de Precios</CardTitle>
        <CardDescription>
          Mostrando {filteredHistory.length} registros de cambios de precios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="border rounded-lg">
            <TableHeader>
              <TableRow className="bg-slate-50 ">
                <TableHead className={tableHeaderClass}>Fecha</TableHead>
                <TableHead className={tableHeaderClass}>Usuario</TableHead>
                <TableHead className={tableHeaderClass}>Código</TableHead>
                <TableHead className={tableHeaderClass}>Nombre</TableHead>
                <TableHead className={tableHeaderClass}>Categoría</TableHead>
                <TableHead className={tableHeaderClass}>Color</TableHead>
                <TableHead className={tableHeaderClass}>Descripción</TableHead>
                <TableHead className={tableHeaderClass}>U. Medida</TableHead>
                <TableHead className={tableHeaderClass + " text-right"}>
                  Precio Anterior
                </TableHead>
                <TableHead className={tableHeaderClass + " text-right"}>
                  Precio Nuevo
                </TableHead>
                <TableHead className={tableHeaderClass}>Cambio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className={monoCellClass}>
                    {formatDate(item.fechaCambio)}
                  </TableCell>
                  <TableCell className="py-3 px-2">{item.usuario}</TableCell>
                  <TableCell className="font-medium py-3 px-2">
                    {item.codigo}
                  </TableCell>
                  <TableCell className="py-3 px-2">{item.nombre}</TableCell>
                  <TableCell className="py-3 px-2">
                    <Badge variant="outline">{item.categoria}</Badge>
                  </TableCell>
                  <TableCell className="py-3 px-2">{item.color}</TableCell>
                  <TableCell className={descCellClass} title={item.descripcion}>
                    {item.descripcion}
                  </TableCell>
                  <TableCell className="py-3 px-2">
                    {item.unidadMedida}
                  </TableCell>
                  <TableCell className={rightCellClass}>
                    {formatPrice(item.precioAnterior)}
                  </TableCell>
                  <TableCell className={rightCellClass + " font-medium"}>
                    {formatPrice(item.precioNuevo)}
                  </TableCell>
                  <TableCell className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      {getPriceChangeIcon(
                        item.precioAnterior,
                        item.precioNuevo
                      )}
                      {getPriceChangeBadge(
                        item.precioAnterior,
                        item.precioNuevo
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredHistory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8">
                    <span className="text-muted-foreground">
                      No se encontraron registros de cambios de precios con los
                      filtros aplicados.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {filteredHistory.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No se encontraron registros de cambios de precios con los filtros
              aplicados.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HistorialPreciosTable;
