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
import CcDeleteDialog from "./CcDeleteDialog";
import { useRemoveFactura } from "@/queries/proveedores/factura/useRemoveFactura";

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

const CcActionCell = ({ movement, currentProveedor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: removeFactura } = useRemoveFactura(
    currentProveedor.id_proveedor
  );

  const navigate = useNavigate();
  const id = getIdLimpio(movement);

  const handleDelete = async () => {
    setIsOpen(false);
    try {
      await removeFactura(getIdLimpio(movement));
      toast.error("Factura eliminada correctamente");
    } catch (e) {
      toast.error("Error al eliminar");
    }
  };

  // Ajustá las rutas según tu sistema
  const viewHref =
    movement.type === "Factura"
      ? `/proveedores/${currentProveedor.id_proveedor}/facturacion/${id}`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${currentProveedor.id_proveedor}/notacredito/${id}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${currentProveedor.id_proveedor}/notadebito/${id}`
      : `/proveedores/${currentProveedor.id_proveedor}/pagos/${id}`;

  const editHref =
    movement.type === "Factura"
      ? `/proveedores/${currentProveedor.id_proveedor}/facturacion/${id}/editar-factura`
      : movement.type === "Nota de Crédito"
      ? `/proveedores/${currentProveedor.id_proveedor}/notacredito/editar-nc/${id}`
      : movement.type === "Nota de Débito"
      ? `/proveedores/${currentProveedor.id_proveedor}/notadebito/editar-nd/${id}`
      : `/proveedores/${currentProveedor.id_proveedor}/pagos/${id}/editar-pago`;

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
