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

export default function OPviewPagos({ pagos }) {
  // 1) Filtrar para no mostrar ítems de monto 0 sin cheques
  const pagosVisibles = pagos.filter((p) => {
    if (Array.isArray(p.cheques) && p.cheques.length > 0) return true;
    return parseFloat(p.monto_aplicado || "0") > 0;
  });

  // 2) Sumar los montos visibles
  const totalValores = pagosVisibles.reduce(
    (acc, p) => acc + parseFloat(p.monto_aplicado || "0"),
    0
  );

  return (
    <div className="border-x px-6">
      <Card className="pt-6">
        <CardHeader>
          <CardTitle className="text-base">COMPOSICIÓN DEL PAGO</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medio de pago</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Fecha Cheque/Acreditación</TableHead>
                <TableHead className="text-right">Importe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosVisibles.map((pago, pagoIdx) => {
                if (Array.isArray(pago.cheques) && pago.cheques.length > 0) {
                  return pago.cheques.map((cheque) => (
                    <TableRow
                      key={`pago-${pago.id}-cheque-${cheque.id_cheque}`}
                      className="bg-slate-50"
                    >
                      <TableCell>Cheque</TableCell>
                      <TableCell>{cheque.numero}</TableCell>
                      <TableCell>
                        {format(
                          new Date(
                            cheque.fecha_pago ?? pago.fecha_acreditacion
                          ),
                          "dd/MM/yyyy",
                          { locale: es }
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(parseFloat(cheque.valor || "0"))}
                      </TableCell>
                    </TableRow>
                  ));
                }
                return (
                  <TableRow key={`pago-${pago.id}-${pagoIdx}`}>
                    <TableCell>{pago.medio || "—"}</TableCell>
                    <TableCell>
                      {pago.numero_comprobante
                        ? pago.numero_comprobante
                        : pago.numero || "—"}
                    </TableCell>
                    <TableCell>
                      {pago.fecha_acreditacion
                        ? format(
                            new Date(pago.fecha_acreditacion),
                            "dd/MM/yyyy",
                            { locale: es }
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(parseFloat(pago.monto_aplicado || "0"))}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell colSpan={4} className="px-2">
                  <div className="flex justify-between items-center">
                    <span className="text-right font-semibold w-full">
                      TOTAL VALORES
                    </span>
                    <span className="text-right font-bold text-green-700 min-w-[120px]">
                      {formatCurrency(totalValores)}
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
