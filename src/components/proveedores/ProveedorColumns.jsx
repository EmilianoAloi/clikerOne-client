import ProveedoresTableActions from "./ProveedorTableActions";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BadgeEstado from "../ui/badge-custom";

// COLUMNAS DE PROVEEDORES
export const SupppliersColumns = [
  {
    accessorKey: "id_proveedor",
    enableSortingRemoval: false, // <--- Importante
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none !p-2 h-10"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-gray-500">{row.getValue("id_proveedor")}</span>
    ),
    meta: {
      className: "w-[60px] max-w-[60px] text-left",
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Nombre
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <strong
        className="truncate block text-left py-2"
        title={row.getValue("nombre")}
      >
        {row.getValue("nombre")}
      </strong>
    ),
    meta: {
      className: "w-[200px] max-w-[200px] text-left",
    },
  },
  {
    accessorKey: "razon_social",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Razón Social
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className="truncate block text-left py-2 px-2"
        title={row.getValue("razon_social")}
      >
        {row.getValue("razon_social")}
      </span>
    ),
    meta: {
      className: "w-[160px] max-w-[160px] text-left",
    },
  },
  {
    accessorKey: "telefono",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Teléfono
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className="truncate block text-left py-2 px-2"
        title={row.getValue("telefono")}
      >
        {row.getValue("telefono")}
      </span>
    ),
    meta: {
      className: "w-[130px] max-w-[130px] text-left",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Email
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className="truncate block text-left py-2 px-2"
        title={row.getValue("email")}
      >
        {row.getValue("email")}
      </span>
    ),
    meta: {
      className: "w-[170px] max-w-[170px] text-left",
    },
  },
  {
    accessorKey: "facturas_pendientes",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Facturas Pendientes
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const count = Number(row.getValue("facturas_pendientes") || 0);
      if (count === 0) {
        return <BadgeEstado estado="ninguna" />;
      }
      return (
        <BadgeEstado estado="pendiente">
          {count} factura{count > 1 ? "s" : ""}
        </BadgeEstado>
      );
    },

    meta: {
      className: "w-[40px] text-left",
    },
  },
  {
    accessorKey: "saldo",
    header: ({ column }) => (
      <Button
        className="cursor-pointer rounded-none p-2 h-10 w-full flex justify-between items-center"
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Cuenta Corriente
        <ChevronDown
          className={cn(
            "h-2 w-2 ml-1 transition-transform duration-200",
            column.getIsSorted() === "asc" && "rotate-180"
          )}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const saldo = Number(row.getValue("saldo"));
      if (saldo > 0) {
        return (
          <BadgeEstado estado="completo">
            + $
            {saldo.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </BadgeEstado>
        );
      } else if (saldo < 0) {
        return (
          <BadgeEstado estado="vencida">
            - $
            {Math.abs(saldo).toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </BadgeEstado>
        );
      } else {
        return <BadgeEstado estado="saldo_cero">Saldo Cero</BadgeEstado>;
      }
    },

    meta: {
      className: "w-[140px] text-left",
    },
  },
  {
    accessorKey: "actions",
    header: () => <span className="block text-right px-2">Acciones</span>,
    cell: ({ row }) => (
      <div className="flex justify-end pr-2">
        <ProveedoresTableActions Proveedor={row.original} />
      </div>
    ),
    meta: {
      className: "w-[80px] text-right",
    },
  },
];
