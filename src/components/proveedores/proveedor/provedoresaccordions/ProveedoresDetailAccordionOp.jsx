import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ReceiptText, Info } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdjuntosBadgePopover from "@/components/ui/adjuntos-badge-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ResumenBadgePopover from "@/components/ui/resumen-badge-popover";

const ProveedoresDetailAccordionOp = ({
  currentProveedores,
  paymentItems = [],
  payments = [],
}) => {
  const [filteredPayments, setFilteredPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pagosFiltrados = payments.filter(
      (p) => p.id_proveedor === currentProveedores.id_proveedor
    );
    setFilteredPayments(pagosFiltrados);
  }, [payments, currentProveedores.id_proveedor]);

  const facturasPorPago = useMemo(() => {
    const map = {};
    (paymentItems || []).forEach((item) => {
      if (typeof item.id_pago !== "number") return;
      if (!map[item.id_pago]) map[item.id_pago] = [];
      const yaExiste = map[item.id_pago].some(
        (f) => f.numero_factura === item.numero_factura
      );
      if (!yaExiste) {
        map[item.id_pago].push({
          numero_factura: item.numero_factura,
          monto_total: item.monto_total ?? 0,
        });
      }
    });
    return map;
  }, [paymentItems]);

  const pagosPorPago = useMemo(() => {
    const map = {};
    (paymentItems || []).forEach((item) => {
      if (typeof item.id_pago !== "number") return;
      if (!map[item.id_pago]) map[item.id_pago] = [];
      map[item.id_pago].push({
        numero_comprobante:
          typeof item.numero_comprobante === "number"
            ? `#${item.numero_comprobante}`
            : item.numero_comprobante,
        monto_aplicado: item.monto_aplicado ?? 0,
      });
    });
    return map;
  }, [paymentItems]);

  const getEstadoBadgeColor = (estado) => {
    switch (estado) {
      case "completo":
        return "bg-green-100 text-green-800 border border-green-200 font-medium";
      case "parcial":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200 font-medium";
      case "pendiente":
      default:
        return "bg-red-100 text-red-800 border border-red-200 font-medium";
    }
  };

  return (
    <AccordionItem
      value="ordenes_pago"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 [&[data-state=open]>svg]:rotate-180 hover:no-underline cursor-pointer group">
        <div className="flex items-center">
          <ReceiptText className="mr-2 h-5 w-5 text-green-700 group-hover:text-green-800 transition-colors" />
          <span className="font-semibold text-lg">Órdenes de Pago</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">
                  N° de OP
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Fecha
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Factura/s
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Pago/s
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">
                  Total Pagos
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  Estado
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  Notas
                </TableHead>
                <TableHead className="text-center font-semibold text-slate-700">
                  Adjuntos
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((pago) => {
                  const facturas = facturasPorPago[pago.id_pago] ?? [];
                  const pagos = pagosPorPago[pago.id_pago] ?? [];

                  return (
                    <TableRow
                      key={pago.id_pago}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/proveedores/${currentProveedores.id_proveedor}/pagos/${pago.id_pago}`
                        )
                      }
                    >
                      <TableCell>#{pago.id_pago}</TableCell>

                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                          {pago.fecha_creada
                            ? new Date(pago.fecha_creada).toLocaleDateString(
                                "es-AR"
                              )
                            : "-"}
                        </div>
                      </TableCell>

                      <TableCell>
                        {facturas.length === 1 ? (
                          <span className="text-sm text-slate-700">
                            <span className="font-medium">
                              #{facturas[0].numero_factura ?? "-"}
                            </span>{" "}
                            – $
                            {facturas[0].monto_total.toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        ) : facturas.length > 1 ? (
                          <ResumenBadgePopover
                            label={`${facturas.length} facturas asociadas`}
                            items={facturas.map((f) => ({
                              label: `#${f.numero_factura ?? "-"}`,
                              value: `$${f.monto_total.toLocaleString("es-AR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`,
                            }))}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      <TableCell>
                        {pagos.length === 1 ? (
                          <span className="text-sm text-slate-700">
                            <span className="font-medium">
                              #{pagos[0].numero_comprobante ?? "-"}
                            </span>{" "}
                            – $
                            {pagos[0].monto_aplicado.toLocaleString("es-AR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        ) : pagos.length > 1 ? (
                          <ResumenBadgePopover
                            label={`${pagos.length} pagos asociados`}
                            items={pagos.map((p) => ({
                              label: p.numero_comprobante?.startsWith(
                                "sin-comp"
                              )
                                ? "-"
                                : `#${p.numero_comprobante}`,
                              value: `$${p.monto_aplicado.toLocaleString(
                                "es-AR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}`,
                            }))}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        ${" "}
                        {Number(pago.monto).toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`${getEstadoBadgeColor(
                            pago.estado_pago
                          )} px-2.5 py-0.5 rounded-md`}
                        >
                          {pago.estado_pago}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-3 text-center">
                        {pago.observaciones ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex justify-center">
                                  <Info className="w-4 h-4 text-slate-500 hover:text-slate-700 cursor-pointer" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[250px] break-words border shadow-md p-3 text-sm">
                                {pago.observaciones}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex justify-center">
                          <AdjuntosBadgePopover
                            adjuntos={pago.adjuntos ?? []}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No hay órdenes de pago para este proveedor.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ProveedoresDetailAccordionOp;
