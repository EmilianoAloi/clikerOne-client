import { useProveedores } from "../../contexts/ProveedorContext";
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
import ProveedoresDeleteDialog from "./ProveedorDeleteDialog";
import ProveedoresActivateDialog from "./ProveedorActivateDialog";
import { Link, useNavigate } from "react-router-dom";

const ProveedoresTableActions = ({ Proveedor }) => {
  const { removeProveedores, activateProveedores } = useProveedores();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el Dropdown

  const isInactivo = !Proveedor.estado_logico;
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
            to={`/proveedores/${Proveedor.id_proveedor}`}
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
            navigate(`/proveedores/${Proveedor.id_proveedor}/editar`);
            setIsOpen(false);
          }}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Pencil className="text-gray-500 h-4 w-4" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {isInactivo ? (
          <ProveedoresActivateDialog
            Proveedor={Proveedor}
            onActivate={async () => {
              await activateProveedores(
                Proveedor.id_proveedor,
                Proveedor.nombre || "Proveedor"
              );
              setIsOpen(false);
            }}
          />
        ) : (
          <ProveedoresDeleteDialog
            Proveedor={Proveedor}
            onDelete={() => {
              removeProveedores(
                Proveedor.id_proveedor,
                Proveedor.nombre || "Desconocido"
              );
              setIsOpen(false);
            }}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProveedoresTableActions;
