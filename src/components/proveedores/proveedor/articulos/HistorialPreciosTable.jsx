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

const HistorialPreciosTable = ({
  filteredHistory,
  formatDate,
  formatPrice,
  getPriceChangeIcon,
  getPriceChangeBadge,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Cambios de Precios</CardTitle>
        <CardDescription>
          Mostrando {filteredHistory.length} registros de cambios de precios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>U. Medida</TableHead>
                <TableHead>Precio Anterior</TableHead>
                <TableHead>Precio Nuevo</TableHead>
                <TableHead>Cambio</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">
                    {formatDate(item.fechaCambio)}
                  </TableCell>
                  <TableCell className="font-medium">{item.codigo}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.categoria}</Badge>
                  </TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.unidadMedida}</TableCell>
                  <TableCell className="font-mono">
                    {formatPrice(item.precioAnterior)}
                  </TableCell>
                  <TableCell className="font-mono font-medium">
                    {formatPrice(item.precioNuevo)}
                  </TableCell>
                  <TableCell>
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
                  <TableCell>{item.usuario}</TableCell>
                  <TableCell className="max-w-xs truncate" title={item.motivo}>
                    {item.motivo}
                  </TableCell>
                </TableRow>
              ))}
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
