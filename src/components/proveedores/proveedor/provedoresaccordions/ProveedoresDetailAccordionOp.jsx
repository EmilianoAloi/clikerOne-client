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
import { Calendar, ReceiptText, Info } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdjuntosBadgePopover from "@/components/ui/adjuntos-badge-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BadgeEstado from "@/components/ui/badge-custom";
import FacturasBagdePopover from "@/components/ui/FacturasBagdePopover";
import PagosBadgePopOver from "@/components/ui/PagosBadgePopOver";

const ProveedoresDetailAccordionOp = ({
  currentProveedores,
  paymentItems = [],
  payments = [],
  isLoading = false,
  error = null,
}) => {
  const navigate = useNavigate();

  // Construcción de facturas y pagos asociados por pago
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
          id_factura: item.id_factura,
          numero_factura: item.numero_factura,
          fecha_emision: item.fecha_emision,
          fecha_vencimiento: item.fecha_vencimiento,
          fecha_contable: item.fecha_contable,
          monto_total: item.monto_total,
          estado: item.estado_saldo || item.estado || "-",
          proveedor_nombre: item.proveedor_nombre,
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
        id_pago: item.id_pago,
        id_proveedor: item.id_proveedor,
        numero_comprobante:
          typeof item.numero_comprobante === "number"
            ? `#${item.numero_comprobante}`
            : item.numero_comprobante || "-",
        monto_aplicado: Number(item.monto_aplicado) || 0,
        medio: item.medio || "-",
        fecha_acreditacion: item.fecha_acreditacion || null,
        estado: item.estado_pago || item.estado || "-",
      });
    });
    return map;
  }, [paymentItems]);

  const pagos = payments;

  return (
    <AccordionItem
      value="ordenes_pago"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 [&[data-state=open]>svg]:rotate-180 hover:no-underline cursor-pointer group">
        <div className="flex items-center">
          <ReceiptText className="mr-2 h-5 w-5 text-green-700 group-hover:text-green-800 transition-colors" />
          <span className="font-semibold text-lg">Ordenes de Pago</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">
                  Fecha Creado
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  N° Comprobante
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Documentos cancelados
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Pagos asociados
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
                  Usuario
                </TableHead>

                <TableHead className="text-center font-semibold text-slate-700">
                  Adjuntos
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Cargando órdenes de pago...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-red-500"
                  >
                    Error al cargar órdenes de pago.
                  </TableCell>
                </TableRow>
              ) : pagos.length > 0 ? (
                pagos.map((pago) => {
                  const facturas = facturasPorPago[pago.id_pago] ?? [];
                  const pagosAsociados = pagosPorPago[pago.id_pago] ?? [];

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
                      <TableCell>#{pago.id_pago}</TableCell>

                      <TableCell>
                        {facturas.length > 0 ? (
                          <FacturasBagdePopover facturas={facturas} />
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      <TableCell>
                        <PagosBadgePopOver pagos={pagosAsociados} />
                      </TableCell>

                      <TableCell className="text-right">
                        ${" "}
                        {Number(pago.monto).toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>

                      <TableCell className="text-center">
                        <BadgeEstado estado={pago.estado_pago} />
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
                      <TableCell className="py-3 text-center">
                        {pago.creador?.nombre || "-"}
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
                    colSpan={9}
                    className="pl-6 sm:text-center sm:pl-0 py-4 text-muted-foreground"
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
