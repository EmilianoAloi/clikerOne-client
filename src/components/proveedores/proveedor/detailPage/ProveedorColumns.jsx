import { ArrowDownRight, ArrowUpRight, Calendar, Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdjuntosBadgePopover from "@/components/ui/adjuntos-badge-popover";
import BadgeEstado from "@/components/ui/badge-custom";
import CcActionCell from "./CcActionCell";

/**
 * @typedef {Object} Movement
 * @property {string} id
 * @property {"Factura" | "Orden de pago" | "Nota de Crédito" | "Nota de Débito"} type
 * @property {string} date
 * @property {string} comprobante
 * @property {string} razon_social
 * @property {"pendiente" | "pendiente de pago" | "parcial" | "pagada" | "vencida" | "sobrada" | "en_discusion" | "anulada" | "con_nota_credito" | "retenida" | "completo" | "ejecutada"} estado
 * @property {number} amount
 * @property {number} balance
 * @property {string} observaciones
 * @property {number=} id_proveedor
 * @property {string=} url_factura_comprobante
 * @property {{ url: string, nombre: string }[]=} adjuntos
 */

export const columnsCC = (currentProveedor) => [
  {
    accessorKey: "date",
    header: "Fecha Movimiento",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center text-sm">
        <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
        {new Date(row.original.date).toLocaleDateString("es-AR")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.original.type;
      const bgColor =
        tipo === "Factura"
          ? "font-semibold bg-stone-100 text-stone-700"
          : "font-semibold bg-slate-100 text-slate-700";
      return (
        <span className={`text-xs px-2.5 py-1 rounded ${bgColor}`}>{tipo}</span>
      );
    },
  },
  {
    accessorKey: "comprobante",
    header: "N° Comprobante",
    cell: ({ row }) => {
      const raw = row.original.comprobante;
      const clean = raw.replace(/^#?\s*/, "");
      return `#${clean}`;
    },
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ row }) => {
      const value = row.original.amount;
      const isIngreso =
        (row.original.type === "Factura" &&
          row.original.estado !== "con_nota_credito") ||
        row.original.type === "Nota de Débito";
      return (
        <div className="flex items-center gap-1 text-left">
          {isIngreso ? (
            <ArrowUpRight className="text-green-600 h-4 w-4" />
          ) : (
            <ArrowDownRight className="text-red-500 h-4 w-4" />
          )}
          <span>
            {Math.abs(value).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      );
    },
    meta: {
      className: "w-[200px]",
    },
  },
  {
    accessorKey: "balance",
    header: "Saldo",
    cell: ({ row }) => {
      const value = row.original.balance;
      const isNegative = value < 0;
      return (
        <div className="flex items-center gap-1 text-left">
          {isNegative ? (
            <ArrowDownRight className="text-red-500 h-4 w-4" />
          ) : (
            <ArrowUpRight className="text-green-600 h-4 w-4" />
          )}
          <span className="text-muted-foreground">
            {Math.abs(value).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <BadgeEstado estado={row.original.estado} />,
  },
  {
    accessorKey: "observaciones",
    header: () => <span className="block text-center">Notas</span>,
    cell: ({ row }) => {
      const obs = row.original.observaciones;
      return (
        <div className="flex justify-center">
          {obs ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <Info className="w-4 h-4 text-slate-500 hover:text-slate-700 cursor-pointer" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px] break-words border shadow-md p-3 text-sm">
                  {obs}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            "-"
          )}
        </div>
      );
    },
    meta: {
      className: "text-center w-[80px]",
    },
  },
  {
    id: "archivos",
    header: () => <span className="block text-center">Adjuntos</span>,
    cell: ({ row }) => {
      const adjuntos = row.original.adjuntos;
      return Array.isArray(adjuntos) && adjuntos.length > 0 ? (
        <AdjuntosBadgePopover adjuntos={adjuntos} />
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
    meta: {
      className: "text-center w-[100px]",
    },
  },
  {
    id: "actions",
    header: () => <span className="block text-center px-2">Acciones</span>,
    cell: ({ row }) => (
      <CcActionCell
        movement={row.original}
        currentProveedor={currentProveedor}
      />
    ),
    meta: {
      className: "text-center",
    },
  },
];
