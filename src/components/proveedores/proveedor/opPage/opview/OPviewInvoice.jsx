import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OPviewInvoice({ facturas }) {
  const totalCancelado = facturas.reduce((acc, f) => acc + f.monto_total, 0);

  return (
    <div className="md: border-x px-6 py-8  mt-[-30px] md:mt-0 ">
      <Card className="pt-6">
        <CardHeader>
          <CardTitle className="text-base">
            DETALLE DE DOCUMENTOS CANCELADOS
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Nº de comprobante</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Importe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facturas.map((factura) => (
                <TableRow key={factura.id_factura}>
                  <TableCell>
                    {factura.fecha_emision
                      ? format(new Date(factura.fecha_emision), "dd.MM.yyyy", {
                          locale: es,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {factura.tipo_comprobante?.toUpperCase() || "-"}
                  </TableCell>
                  <TableCell>{factura.numero_factura}</TableCell>
                  <TableCell>
                    {factura.fecha_vencimiento ? (
                      format(
                        new Date(factura.fecha_vencimiento),
                        "dd.MM.yyyy",
                        { locale: es }
                      )
                    ) : (
                      <span className="italic text-muted-foreground">
                        Sin vencimiento
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-red-700 font-medium">
                    -{formatCurrency(Math.abs(factura.monto_total))}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={5} className="px-2">
                  <div className="flex justify-between items-center">
                    <span className="text-right font-semibold w-full">
                      TOTAL CANCELADO
                    </span>
                    <span className="text-right font-bold text-red-800 min-w-[120px]">
                      -{formatCurrency(Math.abs(totalCancelado))}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
