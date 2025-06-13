import { useSuppliers } from "../../contexts/ProveedorContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import React, { useState } from "react";
import SuppliersDeleteDialog from "./ProveedorDeleteDialog";
import SuppliersActivateDialog from "./ProveedorActivateDialog";
import { Link, useNavigate } from "react-router-dom";

const SuppliersTableActions = ({ supplier }) => {
  const { removeSupplier, activateSupplier } = useSuppliers();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el Dropdown

  const isInactivo = !supplier.estado_logico;
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
        <DropdownMenuItem asChild>
          <Link
            to={`/proveedores/${supplier.id_proveedor}`}
            className="flex items-center gap-2 text-sm"
            onClick={() => setIsOpen(false)}
          >
            <Eye className="h-4 w-4 text-gray-500" />
            Ver detalles
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/proveedores/${supplier.id_proveedor}/editar`);
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Pencil className="text-gray-500 h-4 w-4" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {isInactivo ? (
          <SuppliersActivateDialog
            supplier={supplier}
            onActivate={async () => {
              await activateSupplier(
                supplier.id_proveedor,
                supplier.nombre || "Proveedor"
              );
              setIsOpen(false);
            }}
          />
        ) : (
          <SuppliersDeleteDialog
            supplier={supplier}
            onDelete={() => {
              removeSupplier(
                supplier.id_proveedor,
                supplier.nombre || "Desconocido"
              );
              setIsOpen(false);
            }}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SuppliersTableActions;
