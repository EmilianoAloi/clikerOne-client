import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function ActionCell({ movement, currentSupplier }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Puede ajustar las rutas según el tipo de movimiento
  const handleView = () => {
    if (!movement) return;
    if (movement.type === "Factura") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/facturacion/${movement.id.replace("factura-", "")}`
      );
    } else if (movement.type === "Nota de Crédito") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/notacredito/${movement.id.replace("nc-", "")}`
      );
    } else if (movement.type === "Nota de Débito") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/notadebito/${movement.id.replace("nd-", "")}`
      );
    } else if (movement.type === "Orden de pago") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/pagos/${movement.id.replace("pago-", "")}`
      );
    }
  };

  const handleEdit = () => {
    if (!movement) return;
    if (movement.type === "Factura") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/facturacion/${movement.id.replace("factura-", "")}/editar`
      );
    } else if (movement.type === "Nota de Crédito") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/notacredito/${movement.id.replace("nc-", "")}/editar`
      );
    } else if (movement.type === "Nota de Débito") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/notadebito/${movement.id.replace("nd-", "")}/editar`
      );
    } else if (movement.type === "Orden de pago") {
      navigate(
        `/proveedores/${
          currentSupplier.id_proveedor
        }/pagos/${movement.id.replace("pago-", "")}/editar`
      );
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="px-4">
        <DropdownMenuLabel className="font-bold">Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleView();
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Eye className="h-4 w-4 text-gray-500" />
          Ver detalles
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleEdit();
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
          Editar
        </DropdownMenuItem>

        {/* Agregá más acciones personalizadas si querés */}
        <DropdownMenuSeparator />
        {/* Ejemplo de acción extra:
        <DropdownMenuItem
          onClick={e => {
            e.stopPropagation();
            alert("Acción personalizada");
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Download className="h-4 w-4 text-gray-500" />
          Descargar PDF
        </DropdownMenuItem>
        */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
