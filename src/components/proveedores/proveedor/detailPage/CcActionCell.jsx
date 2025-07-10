import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CcDeleteDialog from "./CcDeleteDialog";
import { useRemoveFactura } from "@/queries/proveedores/factura/useRemoveFactura";
import { useEliminarOP } from "@/queries/proveedores/pagos/useEliminarOP";

// Limpia el prefijo del ID según tipo
function getIdLimpio(movement) {
  if (movement.type === "Factura") return movement.id.replace("factura-", "");
  if (movement.type === "Nota de Crédito")
    return movement.id.replace("nc-", "");
  if (movement.type === "Nota de Débito") return movement.id.replace("nd-", "");
  if (movement.type === "Orden de pago")
    return movement.id.replace("pago-", "");
  return movement.id;
}

export default function CcActionCell({ movement, currentProveedor }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const plainId = getIdLimpio(movement);
  const idProveedor = currentProveedor.id_proveedor;

  // hook para facturas / notas
  const { mutateAsync: removeFactura } = useRemoveFactura(idProveedor);
  // hook para órdenes de pago
  const eliminarPago = useEliminarOP();

  const handleDelete = async () => {
    setIsOpen(false);
    try {
      if (movement.type === "Orden de pago") {
        // elimina orden de pago
        await eliminarPago.mutateAsync({
          idPago: Number(plainId),
          idProveedor,
        });
        // éxito ya notificado en el hook con toast.success
      } else {
        // elimina factura / NC / ND
        await removeFactura(plainId);
        toast.success("Factura eliminada correctamente");
      }
    } catch (e) {
      console.error("Error al eliminar:", e);
      toast.error(
        movement.type === "Orden de pago"
          ? "No se pudo eliminar la orden de pago."
          : "No se pudo eliminar la factura."
      );
    }
  };

  const viewHref =
    movement.type === "Factura"
      ? `/proveedores/${idProveedor}/facturacion/${plainId}`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${idProveedor}/notacredito/${plainId}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${idProveedor}/notadebito/${plainId}`
      : `/proveedores/${idProveedor}/pagos/${plainId}`;

  const editHref =
    movement.type === "Factura"
      ? `/proveedores/${idProveedor}/facturacion/${plainId}/editar-factura`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${idProveedor}/notacredito/editar-nc/${plainId}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${idProveedor}/notadebito/editar-nd/${plainId}`
      : `/proveedores/${idProveedor}/pagos/${plainId}/editar-pago`;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-4">
        <DropdownMenuLabel className="font-bold">Acciones</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link
            to={viewHref}
            className="flex items-center gap-2 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="h-4 w-4 text-gray-500" />
            Ver detalles
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
            navigate(editHref);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <CcDeleteDialog
          movement={movement}
          onDelete={handleDelete}
          onCloseDropdown={() => setIsOpen(false)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </CcDeleteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
