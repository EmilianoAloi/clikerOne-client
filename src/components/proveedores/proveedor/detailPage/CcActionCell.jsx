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
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";
import { useProveedorPayments } from "@/contexts/ProveedorOPContext";

// Utilidad para limpiar el prefijo del ID
function getIdLimpio(movement) {
  if (movement.type === "Factura") return movement.id.replace("factura-", "");
  if (movement.type === "Nota de Crédito")
    return movement.id.replace("nc-", "");
  if (movement.type === "Nota de Débito") return movement.id.replace("nd-", "");
  if (movement.type === "Orden de pago")
    return movement.id.replace("pago-", "");
  return movement.id;
}

const CcActionCell = ({ movement, currentProveedores }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refreshProveedorInvoices } = useProveedorInvoices();
  const { refreshProveedorPayments } = useProveedorPayments();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const id = getIdLimpio(movement);

  // Ajustá las rutas según tu sistema
  const viewHref =
    movement.type === "Factura"
      ? `/proveedores/${currentProveedores.id_proveedor}/facturacion/${id}`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${currentProveedores.id_proveedor}/notacredito/${id}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${currentProveedores.id_proveedor}/notadebito/${id}`
      : `/proveedores/${currentProveedores.id_proveedor}/pagos/${id}`;

  const editHref =
    movement.type === "Factura"
      ? `/proveedores/${currentProveedores.id_proveedor}/facturacion/${id}/editar-factura`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${currentProveedores.id_proveedor}/notacredito/editar-nc/${id}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${currentProveedores.id_proveedor}/notadebito/editar-nd/${id}`
      : `/proveedores/${currentProveedores.id_proveedor}/pagos/${id}/editar-pago`;

  const handleDelete = async () => {
    setIsOpen(false);

    try {
      const id = getIdLimpio(movement);

      // Endpoint para eliminar según tipo
      const endpoint =
        movement.type === "Factura" ||
        movement.type === "Nota de Crédito" ||
        movement.type === "Nota de Débito"
          ? `${BASE_URL}/api/proveedores/facturas/${id}?modificado_por=1`
          : `${BASE_URL}/api/proveedores/pagos/${id}?modificado_por=1`;

      const res = await fetch(endpoint, { method: "DELETE" });

      if (!res.ok) throw new Error("Error al eliminar");

      if (
        movement.type === "Factura" ||
        movement.type === "Nota de Crédito" ||
        movement.type === "Nota de Débito"
      ) {
        await refreshProveedorInvoices(currentProveedores.id_proveedor);
      } else {
        await refreshProveedorPayments(currentProveedores.id_proveedor);
        await refreshProveedorInvoices(currentProveedores.id_proveedor);
      }

      toast.error(`${movement.type} eliminada correctamente`, {
        description: movement.comprobante,
      });
    } catch (error) {
      console.error("Error eliminando:", error);
      toast.error("Error al eliminar el movimiento", {
        description: movement.comprobante,
      });
    }
  };

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
            className="cursor-pointer flex items-center gap-2 text-sm"
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
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CcActionCell;
