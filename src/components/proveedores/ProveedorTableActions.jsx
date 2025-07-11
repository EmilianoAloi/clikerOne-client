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
import { useActivateProveedor } from "@/queries/proveedores/useActivateProveedor";
import { useRemoveProveedor } from "@/queries/proveedores/useRemoveProveedor";
import { useAuth } from "@/contexts/AuthContext";

const ProveedoresTableActions = ({ Proveedor }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.rol === "admin";
  const [isOpen, setIsOpen] = useState(false);

  const removeProveedorMutation = useRemoveProveedor();
  const activateProveedorMutation = useActivateProveedor();

  const isInactivo = !Proveedor.estado_logico;

  const handleActivate = async () => {
    activateProveedorMutation.mutate(Proveedor.id_proveedor, {
      onSuccess: () => {
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Error activando proveedor", error);
        // toast.error o mostrar mensaje
      },
    });
  };

  const handleDelete = async () => {
    removeProveedorMutation.mutate(Proveedor.id_proveedor, {
      onSuccess: () => setIsOpen(false),
      onError: (error) => {
        console.error("Error eliminando proveedor", error);
        // Puedes manejar errores con toasts o mensajes aquí
      },
    });
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
        <DropdownMenuItem asChild disabled={isInactivo}>
          <Link
            to={isInactivo ? "#" : `/proveedores/${Proveedor.id_proveedor}`}
            className={`flex items-center gap-2 text-sm ${
              isInactivo
                ? "opacity-40 pointer-events-none cursor-not-allowed"
                : ""
            }`}
            onClick={() => {
              if (isInactivo) return;
              setIsOpen(false);
            }}
            tabIndex={isInactivo ? -1 : 0}
            aria-disabled={isInactivo}
          >
            <Eye className="h-4 w-4 text-gray-500" />
            Ver detalles
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={isInactivo || !isAdmin}
          onClick={(e) => {
            if (isInactivo) return;
            e.stopPropagation();
            navigate(`/proveedores/${Proveedor.id_proveedor}/editar`);
            setIsOpen(false);
          }}
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            isInactivo
              ? "opacity-40 pointer-events-none cursor-not-allowed"
              : ""
          }`}
          tabIndex={isInactivo ? -1 : 0}
          aria-disabled={isInactivo}
        >
          <Pencil className="text-gray-500 h-4 w-4" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {isInactivo ? (
          <ProveedoresActivateDialog
            Proveedor={Proveedor}
            onActivate={handleActivate}
          />
        ) : (
          <ProveedoresDeleteDialog
            Proveedor={Proveedor}
            onDelete={handleDelete}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProveedoresTableActions;
