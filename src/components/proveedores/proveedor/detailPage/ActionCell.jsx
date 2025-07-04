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
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ActionCell({ idOrdenCompra, idProveedor, onDelete }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleView = () => {
    if (!idOrdenCompra) return;
    navigate(`/proveedores/${idProveedor}/ordencompra/${idOrdenCompra}`);
    setMenuOpen(false);
  };

  const handleEdit = () => {
    if (!idOrdenCompra) return;
    navigate(
      `/proveedores/${idProveedor}/ordencompra/oc-edit/${idOrdenCompra}`
    );
    setMenuOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!idOrdenCompra) return;
    onDelete(idOrdenCompra);
    setDialogOpen(false);
  };

  // Abrir diálogo cierra menú primero
  const openDialog = () => {
    setMenuOpen(false);
    setDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
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
            }}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Pencil className="h-4 w-4 text-gray-500" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Aquí no envuelvas DropdownMenuItem con AlertDialogTrigger, solo abre el diálogo con openDialog */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              openDialog();
            }}
            className="flex items-center gap-2 text-sm cursor-pointer !text-red-600 "
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Diálogo separado fuera del menú */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Orden de Compra</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas eliminar esta orden de compra #{idOrdenCompra}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
