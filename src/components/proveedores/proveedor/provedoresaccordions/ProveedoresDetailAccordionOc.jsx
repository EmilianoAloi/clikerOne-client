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
import BadgeEstado from "@/components/ui/badge-custom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileText,
  Info,
  Calendar,
  BadgeDollarSign,
  Paperclip,
  HandCoins,
  Hash,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdjuntosBadgePopover from "@/components/ui/adjuntos-badge-popover";
import { toast } from "sonner";
import ActionCell from "../detailPage/ActionCell";
import { formatDate } from "@/lib/utils";

const ProveedoresDetailAccordionOc = ({
  currentProveedores,
  compras = [],
  isLoading = false,
  error = null,
  onDeleteCompra,
}) => {
  const navigate = useNavigate();

  const handleDeleteOc = async (id_orden_compra) => {
    if (onDeleteCompra) {
      const ok = await onDeleteCompra(id_orden_compra);
      if (ok) {
        toast.error(`Orden de compra #${id_orden_compra} eliminada`);
      } else {
        // toast.error("No se pudo eliminar la orden de compra");
      }
    }
  };

  return (
    <AccordionItem
      value="ordenescompra"
      className="border rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 [&[data-state=open]>svg]:rotate-180 hover:no-underline cursor-pointer group">
        <div className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
          <span className="font-semibold text-lg">Ordenes de Compra</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-2">
        <div className="border rounded-lg overflow-x-auto shadow-sm">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-slate-50">
                {[
                  { icon: Hash, label: "N° OC", className: "text-left" },
                  { icon: Calendar, label: "Emisión", className: "text-left" },
                  { icon: Calendar, label: "Entrega", className: "text-left" },
                  {
                    icon: BadgeDollarSign,
                    label: "Monto",
                    className: "text-left",
                  },
                  {
                    icon: HandCoins,
                    label: "Condición Pago",
                    className: "text-left",
                  },
                  { icon: FileText, label: "Estado", className: "text-left" },
                  { icon: Info, label: "Notas", className: "text-center" },
                  {
                    icon: Paperclip,
                    label: "Adjuntos",
                    className: "text-center",
                  },
                  { icon: User, label: "Usuario", className: "text-center" },
                  { label: "Acciones", className: "text-center" },
                ].map(({ icon: Icon, label, className = "" }, i) => (
                  <TableHead
                    key={i}
                    className={`font-semibold text-slate-700 ${className}`}
                  >
                    <span className="inline-flex items-center gap-1 justify-center">
                      {Icon && <Icon className="w-4 h-4" />} {label}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    Cargando órdenes...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-4 text-red-500"
                  >
                    Error al cargar órdenes de compra.
                  </TableCell>
                </TableRow>
              ) : compras.length > 0 ? (
                compras.map((oc) => (
                  <TableRow
                    key={oc.id_orden_compra}
                    className="hover:bg-slate-50 transition-colors duration-150 cursor-pointer "
                    onClick={() =>
                      navigate(
                        `/proveedores/${currentProveedores.id_proveedor}/ordencompra/${oc.id_orden_compra}`
                      )
                    }
                  >
                    <TableCell className="py-3 font-medium text-left ps-3">
                      #{oc.id_orden_compra}
                    </TableCell>
                    <TableCell className="py-3 text-left ps-3">
                      {oc.fecha_emision ? formatDate(oc.fecha_emision) : "-"}
                    </TableCell>
                    <TableCell className="py-3 text-left ps-3">
                      {oc.fecha_entrega ? formatDate(oc.fecha_entrega) : "-"}
                    </TableCell>
                    <TableCell className="py-3 text-left font-medium ps-3">
                      $
                      {oc.monto_total?.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="py-3 text-left ps-3">
                      {oc.condicion_pago || "-"}
                    </TableCell>
                    <TableCell className="py-3 text-left">
                      <BadgeEstado estado={oc.estado_compra ?? ""} />
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {oc.observaciones ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex justify-center">
                                <Info className="w-4 h-4 text-slate-500 hover:text-slate-700" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[250px] break-words border shadow-md p-3 text-sm">
                              {oc.observaciones}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="py-3 text-center w-[100px]">
                      <AdjuntosBadgePopover
                        adjuntos={
                          oc.url_orden_compra_comprobante
                            ? [
                                {
                                  url: oc.url_orden_compra_comprobante,
                                  nombre: "Comprobante OC",
                                },
                              ]
                            : []
                        }
                      />
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {oc.creador?.nombre || "sin datos"}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <ActionCell
                        idOrdenCompra={oc.id_orden_compra}
                        idProveedor={currentProveedores.id_proveedor}
                        onDelete={handleDeleteOc}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="pl-6 w-full sm:text-center md:pl-0 py-4 text-muted-foreground"
                  >
                    No hay órdenes de compra para este proveedor.
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

export default ProveedoresDetailAccordionOc;
