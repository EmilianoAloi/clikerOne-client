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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Info, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdjuntosBadgePopover from "@/components/ui/adjuntos-badge-popover";
import BadgeEstado from "@/components/ui/badge-custom";

const capitalizeWords = (str) =>
  str ? str.toLowerCase().replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) : "";

const ProveedoresDetailAccordionFacturacion = ({
  currentProveedores,
  invoices = [],
  isLoading = false,
  error = null,
}) => {
  const navigate = useNavigate();

  // Ordena invoices por fecha_creado DESC
  const sortedInvoices = invoices
    ? [...invoices].sort(
        (a, b) =>
          new Date(b.fecha_creado || b.fecha_emision) -
          new Date(a.fecha_creado || a.fecha_emision)
      )
    : [];
  console.log("invoices", invoices);

  return (
    <AccordionItem
      value="facturas"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 [&[data-state=open]>svg]:rotate-180 hover:no-underline cursor-pointer group">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
          <span className="font-semibold text-lg">Facturas</span>
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
                  Tipo
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Emisión
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Vencimiento
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-start">
                  Monto
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-start ">
                  Estado
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">
                  Notas
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">
                  Usuario
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-center w-[130px]">
                  Adjuntos
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    Cargando facturas...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-4 text-red-500"
                  >
                    Error al cargar facturas.
                  </TableCell>
                </TableRow>
              ) : sortedInvoices.length > 0 ? (
                sortedInvoices.map((factura) => (
                  <TableRow
                    key={factura.id_factura}
                    className="hover:bg-slate-50 transition-colors duration-150 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/proveedores/${currentProveedores.id_proveedor}/facturacion/${factura.id_factura}`
                      )
                    }
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        {factura.fecha_creado
                          ? new Date(factura.fecha_creado).toLocaleDateString(
                              "es-AR"
                            )
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      #{factura.numero_factura}
                    </TableCell>
                    <TableCell className="py-3">
                      {factura.tipo_comprobante
                        ? capitalizeWords(factura.tipo_comprobante)
                        : "-"}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        {factura.fecha_emision
                          ? new Date(factura.fecha_emision).toLocaleDateString(
                              "es-AR"
                            )
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                        {factura.fecha_vencimiento ? (
                          new Date(
                            factura.fecha_vencimiento
                          ).toLocaleDateString("es-AR")
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            Sin vencimiento
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-right font-medium">
                      <div className="flex items-center justify-start gap-1">
                        <span>$</span>
                        {factura.monto_total?.toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 ">
                      <BadgeEstado estado={factura.estado_saldo} />
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {factura.observaciones ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex justify-center">
                                <Info className="w-4 h-4 text-slate-500 hover:text-slate-700 cursor-pointer" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[250px] break-words border shadow-md p-3 text-sm">
                              {factura.observaciones}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {factura.modificador_nombre ||
                        factura.creador_nombre ||
                        "-"}
                    </TableCell>
                    <TableCell className="py-3 text-center text-center w-[100px]">
                      <AdjuntosBadgePopover
                        adjuntos={
                          factura.url_factura_comprobante
                            ? [
                                {
                                  url: factura.url_factura_comprobante,
                                  nombre: "Comprobante",
                                },
                              ]
                            : []
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="pl-6 sm:text-center sm:pl-0 py-4 text-muted-foreground"
                  >
                    No hay facturas para este proveedor.
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

export default ProveedoresDetailAccordionFacturacion;
